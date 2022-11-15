import { BasicEventEmitter } from "@ge/classes/BasicEventEmitter"
import { Camera } from "@ge/classes/Camera"
import { Mouse } from "@ge/classes/Mouse"

import { RenderObject } from "@ge/typings/RenderObject"
import { Size } from "@ge/typings/Size"

type EventListeners = {
	tick: Array<(scene: Scene) => void>
}

export class Scene extends BasicEventEmitter<EventListeners> {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	private padding: Size = { width: 0, height: 0 }
	private border: Size = { width: 0, height: 0 }
	private rect: DOMRect | undefined

	public objects: RenderObject[] = []
	public camera: Camera
	public mouse: Mouse

	constructor(canvas: HTMLCanvasElement, camera: Camera) {
		super()
		this.canvas = canvas
		this.camera = camera
		this.mouse = new Mouse(camera)
		this.ctx = canvas.getContext("2d")!

		this.onPointerEvent = this.onPointerEvent.bind(this)
		canvas.addEventListener("pointermove", this.onPointerEvent)
		canvas.addEventListener("pointerdown", this.onPointerEvent)
		canvas.addEventListener("pointerup", this.onPointerEvent)

		this.calculateCanvasOffsets()
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

	public calculateCanvasOffsets(): void {
		this.rect = this.canvas.getBoundingClientRect()

		const canvasStyle = document.defaultView?.getComputedStyle(this.canvas)
		this.padding.width = parseInt(canvasStyle?.paddingLeft || "0") || 0
		this.padding.height = parseInt(canvasStyle?.paddingTop || "0") || 0
		this.border.width = parseInt(canvasStyle?.borderLeft || "0") || 0
		this.border.height = parseInt(canvasStyle?.borderTop || "0") || 0
	}

	private onPointerEvent(e: PointerEvent): void {
		this.mouse.position.x =
			e.clientX -
			(this.rect?.left ?? 0) -
			this.border.width -
			this.padding.width
		this.mouse.position.y =
			e.clientY -
			(this.rect?.top ?? 0) -
			this.border.height -
			this.padding.height

		this.mouse.button = e.buttons
	}

	public destroy(): void {
		this.canvas.removeEventListener("pointermove", this.onPointerEvent)
		this.canvas.removeEventListener("pointerdown", this.onPointerEvent)
		this.canvas.removeEventListener("pointerup", this.onPointerEvent)
	}
}
