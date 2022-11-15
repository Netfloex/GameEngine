import { Camera } from "@ge/classes/Camera"
import { Position } from "@ge/classes/Position"

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

	private tempPosition = new Position()

	render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.strokeStyle = this.color

		ctx.lineWidth = this.strokeWidth

		this.tempPosition.copyFrom(this.position).subtract(camera.position)

		ctx.arc(
			this.tempPosition.x,
			this.tempPosition.y,
			this.radius,
			0,
			2 * Math.PI,
		)

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
