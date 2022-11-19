import { Camera } from "@ge/classes/Camera"
import { RenderObject } from "@ge/classes/RenderObject"

import { Colorable } from "@ge/typings/Colorable"
import { Positionable } from "@ge/typings/Positionable"
import { RenderObjectType } from "@ge/typings/RenderObjectType"
import { Strokable } from "@ge/typings/Strokable"

export interface CircleOpts extends Strokable, Positionable, Colorable {
	radius: number
}

export class Circle extends RenderObject implements RenderObjectType {
	public radius

	render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		const position = this.getScreenPosition(camera)

		this.strokeOrFill(ctx, () => {
			ctx.arc(position.x, position.y, this.radius, 0, 2 * Math.PI)
		})
	}

	constructor(opts: CircleOpts) {
		super(opts)

		this.radius = opts.radius
	}
}
