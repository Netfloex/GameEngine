import { Camera } from "@classes/Camera"
import { Position } from "@classes/Position"

import { Colorable } from "@typings/Colorable"
import { Positionable } from "@typings/Positionable"
import { Strokable } from "@typings/Strokable"

type RenderObjectOpts = Positionable & Partial<Strokable & Colorable>

export class RenderObject implements RenderObjectOpts {
	public position: Position
	public color
	public stroke
	public strokeWidth

	private tempPosition = new Position()

	public strokeOrFill(
		ctx: CanvasRenderingContext2D,
		render: () => void,
	): void {
		ctx.beginPath()

		ctx.fillStyle = this.color ?? "white"
		ctx.strokeStyle = this.color ?? "white"

		ctx.lineWidth = this.strokeWidth ?? 1

		render()

		if (!this.stroke) {
			ctx.fill()
		} else {
			ctx.stroke()
		}
	}

	public getScreenPosition(camera: Camera): Position {
		return this.tempPosition
			.copyFrom(this.position)
			.subtract(camera.position)
	}

	constructor(opts: RenderObjectOpts) {
		this.position = opts.position
		this.color = opts.color
		this.stroke = opts.stroke
		this.strokeWidth = opts.stroke ? opts.strokeWidth ?? 1 : 0
	}
}
