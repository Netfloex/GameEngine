import { Camera } from "@classes/Camera"
import { Position } from "@classes/Position"

import { Alphable } from "@typings/Alphable.d"
import { Colorable } from "@typings/Colorable"
import { PositionableLike } from "@typings/Positionable"
import { Rotatable } from "@typings/Rotatable.d"
import { Strokable } from "@typings/Strokable"

type RenderObjectOpts = PositionableLike &
	Partial<Strokable & Colorable & Rotatable & Alphable> & {
		visible?: boolean
	}

export class RenderObject implements RenderObjectOpts {
	public position: Position
	public color
	public stroke
	public strokeWidth
	public rotation
	public alpha
	public visible

	private tempPosition = new Position(0, 0)

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
		this.position =
			opts.position instanceof Position
				? opts.position
				: new Position(
						...(Array.isArray(opts.position)
							? opts.position
							: [opts.position]),
				  )
		this.color = opts.color
		this.stroke = opts.stroke
		this.strokeWidth = opts.stroke ? opts.strokeWidth ?? 1 : 0
		this.alpha = opts.alpha ?? 1
		this.rotation = opts.rotation ?? 0
		this.visible = opts.visible ?? true
	}
}
