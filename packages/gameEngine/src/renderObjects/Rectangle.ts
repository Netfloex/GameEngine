import { circleRectangleCollision } from "./../utils/collision/circleRectangle"
import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { rectangleRectangleCollision } from "@utils/collision/rectangleRectangle"

import { Colorable } from "@typings/Colorable"
import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { Sizable } from "@typings/Sizable"
import { StandardOptions } from "@typings/StandardOptions"
import { Strokable } from "@typings/Strokable"

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

	public isCollidingWith(other: RenderObjects): boolean {
		switch (other.type) {
			case "rectangle":
				return rectangleRectangleCollision(other, this)
			case "circle":
				return circleRectangleCollision(other, this)
		}
	}

	constructor(opts: RectangleOpts) {
		super(opts)

		this.size = opts.size
		this.color = opts.color
	}
}
