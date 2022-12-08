import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"
import { Size } from "@classes/Size"

import { circleRectangleCollision } from "@utils/collision/circleRectangle"
import { rectangleRectangleCollision } from "@utils/collision/rectangleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { WithPath2D } from "@typings/WithPath2D"
import { Colorable } from "@typings/optionable/Colorable"
import { SizeableLike } from "@typings/optionable/Sizable"
import { Strokable } from "@typings/optionable/Strokable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface RectangleOpts
	extends StandardOptions,
		Strokable,
		Colorable,
		SizeableLike {}

export class Rectangle
	extends RenderObject
	implements RenderObjectType, WithPath2D
{
	public size: Size
	public type = "rectangle" as const

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
			if (!this.path || !this.size.equals(this.oldSize)) {
				this.path = this.createPath()
				this.oldSize.copyFrom(this.size)
			}

			return this.strokeOrFill(ctx, this.path)
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
				case "text":
					return rectangleRectangleCollision(
						other.getBoundingBoxRectangle(),
						this,
					)
			}
		})
	}

	constructor(opts: RectangleOpts = {}) {
		super(opts)

		this.size =
			opts.size instanceof Size
				? opts.size
				: Reflect.construct(Size, [opts.size].flat())
		this.color = opts.color ?? "white"
	}
}
