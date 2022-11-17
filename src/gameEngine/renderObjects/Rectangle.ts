import { Camera } from "@ge/classes/Camera"
import { RenderObject } from "@ge/classes/RenderObject"

import { Colorable } from "@ge/typings/Colorable"
import { Positionable } from "@ge/typings/Positionable"
import { RenderObjectType } from "@ge/typings/RenderObjectType"
import { Sizable } from "@ge/typings/Sizable"
import { Strokable } from "@ge/typings/Strokable"

export interface RectangleOpts
	extends Strokable,
		Positionable,
		Colorable,
		Sizable {}

export class Rectangle
	extends RenderObject
	implements RectangleOpts, RenderObjectType
{
	public size
	public color
	public stroke
	public strokeWidth

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
		this.stroke = opts.stroke ?? false
		this.strokeWidth = opts.strokeWidth ?? 1
	}
}
