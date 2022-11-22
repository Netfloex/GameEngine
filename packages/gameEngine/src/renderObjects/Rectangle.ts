import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"

import { Colorable } from "@typings/Colorable"
import { Positionable } from "@typings/Positionable"
import { RenderObjectType } from "@typings/RenderObjectType"
import { Sizable } from "@typings/Sizable"
import { Strokable } from "@typings/Strokable"

export interface RectangleOpts
	extends Strokable,
		Positionable,
		Colorable,
		Sizable {}

export class Rectangle extends RenderObject implements RenderObjectType {
	public size

	render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		const position = this.getScreenPosition(camera)

		this.strokeOrFill(ctx, () => {
			ctx.rect(position.x, position.y, this.size.width, this.size.height)
		})
	}

	constructor(opts: RectangleOpts) {
		super(opts)

		this.size = opts.size
		this.color = opts.color
	}
}
