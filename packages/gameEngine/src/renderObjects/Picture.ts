import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"
import { Size } from "@classes/Size"

import { circleRectangleCollision } from "@utils/collision/circleRectangle"
import { rectangleRectangleCollision } from "@utils/collision/rectangleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { WithPath2D } from "@typings/WithPath2D"
import { SizeableLike } from "@typings/optionable/Sizable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface PictureOpts extends StandardOptions, SizeableLike {
	src: string
}

export class Picture
	extends RenderObject
	implements RenderObjectType, WithPath2D
{
	public size: Size
	public type = "picture" as const

	public image = new Image()

	public path: Path2D | undefined
	private oldSize: Size = new Size()

	public createPath(): Path2D {
		const path = new Path2D()
		path.rect(
			-this.size.width / 2,
			-this.size.height / 2,
			this.size.width,
			this.size.height,
		)

		return path
	}

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
				if (!this.path || !this.size.equals(this.oldSize)) {
					this.path = this.createPath()
					this.oldSize.copyFrom(this.size)
				}

				this.strokeOrFill(ctx, this.path)
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

		this.size =
			opts.size instanceof Size
				? opts.size
				: Reflect.construct(Size, [opts.size].flat())
		this.image.src = opts.src
	}
}
