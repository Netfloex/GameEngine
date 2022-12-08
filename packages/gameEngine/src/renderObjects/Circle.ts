import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { circleCircleCollision } from "@utils/collision/circleCircle"
import { circleRectangleCollision } from "@utils/collision/circleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { WithPath2D } from "@typings/WithPath2D"
import { Colorable } from "@typings/optionable/Colorable"
import { Strokable } from "@typings/optionable/Strokable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface CircleOpts extends StandardOptions, Strokable, Colorable {
	radius?: number
}

export class Circle
	extends RenderObject
	implements RenderObjectType, WithPath2D
{
	public radius
	public type = "circle" as const

	public path: Path2D | undefined
	private oldRadius: number | undefined

	public createPath(): Path2D {
		const path = new Path2D()
		path.arc(0, 0, this.radius, 0, 2 * Math.PI)

		return path
	}

	public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		this.prepareRender(ctx, camera, () => {
			if (!this.path || this.oldRadius !== this.radius) {
				this.path = this.createPath()
				this.oldRadius = this.radius
			}

			return this.strokeOrFill(ctx, this.path)
		})
	}

	public isCollidingWith(others: OptionalArray<RenderObjects>): boolean {
		return [others].flat().some((other) => {
			switch (other.type) {
				case "rectangle":
				case "picture":
					return circleRectangleCollision(this, other)
				case "circle":
					return circleCircleCollision(this, other)
				case "text":
					return circleRectangleCollision(
						this,
						other.getBoundingBoxRectangle(),
					)
			}
		})
	}

	constructor(opts: CircleOpts = {}) {
		super(opts)

		this.radius = opts.radius ?? 1
	}
}
