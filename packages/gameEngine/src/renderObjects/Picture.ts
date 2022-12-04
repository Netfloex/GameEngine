import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { circleRectangleCollision } from "@utils/collision/circleRectangle"
import { rectangleRectangleCollision } from "@utils/collision/rectangleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { Sizable } from "@typings/optionable/Sizable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface PictureOpts extends StandardOptions, Sizable {
	src: string
}

export class Picture extends RenderObject implements RenderObjectType {
	public size
	public type = "picture" as const

	private image = new Image()

	public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		this.prepareRender(ctx, camera, () => {
			if (this.image.complete && this.image.naturalHeight !== 0) {
				ctx.drawImage(
					this.image,
					-this.size.width / 2,
					-this.size.height / 2,
					this.size.width,
					this.size.height,
				)
			} else {
				this.strokeOrFill(ctx, () =>
					ctx.rect(
						-this.size.width / 2,
						-this.size.height / 2,
						this.size.width,
						this.size.height,
					),
				)
			}
		})
	}

	public isCollidingWith(others: OptionalArray<RenderObjects>): boolean {
		return [others].flat().some((other) => {
			switch (other.type) {
				case "rectangle":
				case "picture":
					return rectangleRectangleCollision(other, this)
				case "circle":
					return circleRectangleCollision(other, this)
			}
		})
	}

	constructor(opts: PictureOpts) {
		super({ ...opts, color: "gray" })

		this.size = opts.size
		this.image.src = opts.src
	}
}
