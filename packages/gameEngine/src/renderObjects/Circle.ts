import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { circleCircleCollision } from "@utils/collision/circleCircle"
import { circleRectangleCollision } from "@utils/collision/circleRectangle"

import { Colorable } from "@typings/Colorable"
import { Positionable } from "@typings/Positionable"
import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { Strokable } from "@typings/Strokable"

export interface CircleOpts extends Strokable, Positionable, Colorable {
	radius: number
}

export class Circle extends RenderObject implements RenderObjectType {
	public radius
	public type = "circle" as const

	public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		const position = this.getScreenPosition(camera)
		this.strokeOrFill(ctx, () => {
			ctx.arc(position.x, position.y, this.radius, 0, 2 * Math.PI)
		})
	}

	public isCollidingWith(other: RenderObjects): boolean {
		switch (other.type) {
			case "rectangle":
				return circleRectangleCollision(this, other)
			case "circle":
				return circleCircleCollision(this, other)
		}
	}

	constructor(opts: CircleOpts) {
		super(opts)

		this.radius = opts.radius
	}
}
