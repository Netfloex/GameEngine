import { RenderObject } from "@ge/renderObjects/RenderObject"

import { CanvasColor } from "@ge/typings/CanvasColor"
import { Position } from "@ge/typings/Position"

interface CircleOpts {
	position: Position
	color: CanvasColor
	radius: number
}

export class Circle implements CircleOpts, RenderObject {
	public position: Position
	public radius: number
	public color: CanvasColor

	render(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
		ctx.fill()
	}

	constructor(opts: CircleOpts) {
		this.position = opts.position
		this.radius = opts.radius
		this.color = opts.color
	}
}
