import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { circleRectangleCollision } from "@utils/collision/circleRectangle"
import { rectangleRectangleCollision } from "@utils/collision/rectangleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { Colorable } from "@typings/optionable/Colorable"
import { Sizable } from "@typings/optionable/Sizable"
import { Strokable } from "@typings/optionable/Strokable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface RectangleOpts
	extends StandardOptions,
		Strokable,
		Colorable,
		Sizable {}

export class Rectangle extends RenderObject implements RenderObjectType {
	public size
	public type = "rectangle" as const

	public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		this.prepareRender(ctx, camera, () =>
			this.strokeOrFill(ctx, () => {
				ctx.rect(
					-this.size.width / 2,
					-this.size.height / 2,
					this.size.width,
					this.size.height,
				)
			}),
		)
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

	constructor(opts: RectangleOpts) {
		super(opts)

		this.size = opts.size
		this.color = opts.color
	}
}
