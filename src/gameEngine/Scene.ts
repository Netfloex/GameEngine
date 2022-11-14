import { Camera } from "./renderObjects/Camera"
import { BasicEventEmitter } from "@ge/BasicEventEmitter"

import { RenderObject } from "@ge/typings/RenderObject"

type EventListeners = {
	tick: Array<(scene: Scene) => void>
}

export class Scene extends BasicEventEmitter<EventListeners> {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	public objects: RenderObject[] = []
	public camera: Camera

	constructor(canvas: HTMLCanvasElement, camera: Camera) {
		super()
		this.canvas = canvas
		this.camera = camera
		this.ctx = canvas.getContext("2d")!
	}

	public tick(): void {
		this.emit("tick", this)

		this.ctx.clearRect(0, 0, this.width, this.height)

		this.objects.forEach((obj) => {
			obj.render(this.ctx, this.camera)
		})
	}

	/* 
		Width and Height
	*/

	public get height(): number {
		return this.canvas.height
	}

	public get width(): number {
		return this.canvas.width
	}
}
