import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { Colorable } from "@typings/Colorable"
import { Positionable } from "@typings/Positionable"
import { RenderObjectType } from "@typings/RenderObjectType"
import { Strokable } from "@typings/Strokable"

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
