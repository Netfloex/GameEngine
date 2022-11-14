import { BasicEventEmitter } from "@ge/BasicEventEmitter"
import { Camera } from "@ge/renderObjects/Camera"
import { Mouse } from "@ge/renderObjects/Mouse"

import { RenderObject } from "@ge/typings/RenderObject"

type EventListeners = {
	tick: Array<(scene: Scene) => void>
}

export class Scene extends BasicEventEmitter<EventListeners> {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	public objects: RenderObject[] = []
	public camera: Camera
	public mouse: Mouse

	constructor(canvas: HTMLCanvasElement, camera: Camera) {
		super()
		this.canvas = canvas
		this.camera = camera
		this.mouse = new Mouse(camera)
		this.ctx = canvas.getContext("2d")!

		this.onPointerMove = this.onPointerMove.bind(this)
		canvas.addEventListener("pointermove", this.onPointerMove)
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

	private onPointerMove(e: PointerEvent): void {
		this.mouse.position.x = e.clientX
		this.mouse.position.y = e.clientY
	}

	public destroy(): void {
		this.canvas.removeEventListener("pointermove", this.onPointerMove)
	}
}
