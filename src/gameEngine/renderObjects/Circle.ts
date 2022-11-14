import { Colorable } from "@ge/typings/Colorable"
import { Positionable } from "@ge/typings/Positionable"
import { RenderObject } from "@ge/typings/RenderObject"
import { Strokable } from "@ge/typings/Strokable"

interface CircleOpts extends Strokable, Positionable, Colorable {
	radius: number
}

export class Circle implements CircleOpts, RenderObject {
	public position
	public radius
	public color
	public stroke
	public strokeWidth

	render(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.strokeStyle = this.color

		ctx.lineWidth = this.strokeWidth
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)

		if (!this.stroke) ctx.fill()
		else ctx.stroke()
	}

	constructor(opts: CircleOpts) {
		this.position = opts.position
		this.radius = opts.radius
		this.color = opts.color
		this.stroke = opts.stroke ?? false
		this.strokeWidth = opts.strokeWidth ?? 1
	}
}
