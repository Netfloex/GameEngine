import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { circleCircleCollision } from "@utils/collision/circleCircle"
import { circleRectangleCollision } from "@utils/collision/circleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { Colorable } from "@typings/optionable/Colorable"
import { Strokable } from "@typings/optionable/Strokable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface CircleOpts extends StandardOptions, Strokable, Colorable {
	radius?: number
}

export class Circle extends RenderObject implements RenderObjectType {
	public radius
	public type = "circle" as const

	public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		this.prepareRender(ctx, camera, () =>
			this.strokeOrFill(ctx, () => {
				ctx.arc(0, 0, this.radius, 0, 2 * Math.PI)
			}),
		)
	}

	public isCollidingWith(others: OptionalArray<RenderObjects>): boolean {
		return [others].flat().some((other) => {
			switch (other.type) {
				case "rectangle":
				case "picture":
					return circleRectangleCollision(this, other)
				case "circle":
					return circleCircleCollision(this, other)
			}
		})
	}

	constructor(opts: CircleOpts = {}) {
		super(opts)

		this.radius = opts.radius ?? 1
	}
}
