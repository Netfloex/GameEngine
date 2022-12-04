import { Camera } from "@classes/Camera"
import { Position } from "@classes/Position"

import { Alphable } from "@typings/optionable/Alphable"
import { Colorable } from "@typings/optionable/Colorable"
import { PositionableLike } from "@typings/optionable/Positionable"
import { Rotatable } from "@typings/optionable/Rotatable"
import { Strokable } from "@typings/optionable/Strokable"

type RenderObjectOpts = Partial<
	PositionableLike &
		Strokable &
		Colorable &
		Rotatable &
		Alphable & {
			visible?: boolean
		}
>

export class RenderObject implements RenderObjectOpts {
	public position: Position
	public color
	public stroke
	public strokeWidth
	public rotation
	public alpha
	public visible

	private tempPosition = new Position()

	public prepareRender(
		ctx: CanvasRenderingContext2D,
		camera: Camera,
		render: () => void,
	): void {
		ctx.save()

		ctx.globalAlpha = this.alpha

		const pos = this.getScreenPosition(camera)
		ctx.translate(pos.x, pos.y)
		ctx.rotate(this.rotation)

		render()

		ctx.restore()
	}

	public strokeOrFill(
		ctx: CanvasRenderingContext2D,
		render: () => void,
	): void {
		ctx.beginPath()

		ctx.fillStyle = this.color
		ctx.strokeStyle = this.color

		ctx.lineWidth = this.strokeWidth

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
		this.position =
			opts.position instanceof Position
				? opts.position
				: Reflect.construct(Position, [opts.position].flat())
		this.color = opts.color ?? "white"
		this.stroke = opts.stroke
		this.strokeWidth = opts.stroke ? opts.strokeWidth ?? 1 : 0
		this.alpha = opts.alpha ?? 1
		this.rotation = opts.rotation ?? 0
		this.visible = opts.visible ?? true
	}
}
