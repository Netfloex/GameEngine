import { BasicEventEmitter } from "@classes/BasicEventEmitter"
import { Camera } from "@classes/Camera"
import { Mouse } from "@classes/Mouse"

import { RenderObjects } from "@typings/RenderObjects"
import { Size } from "@typings/Size"

type EventListeners = {
	tick: Array<(scene: Scene) => void>
}

export class Scene extends BasicEventEmitter<EventListeners> {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	private padding: Size = { width: 0, height: 0 }
	private border: Size = { width: 0, height: 0 }
	private rect: DOMRect | undefined

	public objects: Array<RenderObjects> = []
	public camera: Camera

	public mouse: Mouse
	public keyboard: Record<string, boolean> = {}

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

		this.onKeyboardEvent = this.onKeyboardEvent.bind(this)
		addEventListener("keydown", this.onKeyboardEvent)
		addEventListener("keyup", this.onKeyboardEvent)

		this.calculateCanvasOffsets()
	}

	public tick(): void {
		this.emit("tick", this)

		this.ctx.clearRect(0, 0, this.width, this.height)

		for (const obj of this.objects) {
			obj.render(this.ctx, this.camera)
		}
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

	private onKeyboardEvent(e: KeyboardEvent): void {
		if (e.type == "keydown") {
			this.keyboard[e.key] = true
		} else {
			delete this.keyboard[e.key]
		}
	}

	public destroy(): void {
		this.canvas.removeEventListener("pointermove", this.onPointerEvent)
		this.canvas.removeEventListener("pointerdown", this.onPointerEvent)
		this.canvas.removeEventListener("pointerup", this.onPointerEvent)

		removeEventListener("keydown", this.onKeyboardEvent)
		removeEventListener("keyup", this.onKeyboardEvent)
	}
}
