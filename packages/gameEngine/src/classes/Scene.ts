import { BasicEventEmitter } from "@classes/BasicEventEmitter"
import { Camera } from "@classes/Camera"
import { Clock } from "@classes/Clock"
import { Mouse } from "@classes/Mouse"
import { Size } from "@classes/Size"

import { RenderObjects } from "@typings/RenderObjects"

type EventListeners = {
	tick: Array<(scene: Scene) => void>
}

export class Scene extends BasicEventEmitter<EventListeners> {
	public canvas: HTMLCanvasElement
	public ctx: CanvasRenderingContext2D

	private padding = new Size()
	private border = new Size()
	private rect: DOMRect | undefined

	public objects: Array<RenderObjects> = []
	public camera: Camera
	public clock: Clock

	public mouse: Mouse
	public keyboard: Record<string, boolean> = {}

	constructor(canvas: HTMLCanvasElement, camera: Camera) {
		super()

		this.canvas = canvas
		this.camera = camera
		this.mouse = new Mouse(camera)
		this.clock = new Clock()
		this.ctx = canvas.getContext("2d")!

		this.addEventListeners()
		this.calculateCanvasOffsets()
	}

	public tick(): void {
		this.emit("tick", this)

		this.ctx.clearRect(0, 0, this.width, this.height)
		for (const obj of this.objects) {
			if (obj.visible) {
				if (
					obj.isCollidingWith(this.camera.getVisibleRectangle(this))
				) {
					obj.render(this.ctx, this.camera)
				}
			}
		}

		this.clock.setDeltaTime()
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

	public add(...objects: RenderObjects[]): void {
		if (objects.find((o) => !o)) {
			throw new Error("scene.add with an object that is undefined!")
		}
		this.objects.push(...objects)
	}

	public remove(...objects: RenderObjects[]): void {
		this.objects = this.objects.filter((o) => !objects.includes(o))
	}

	public calculateCanvasOffsets(): void {
		this.rect = this.canvas.getBoundingClientRect()

		const canvasStyle = document.defaultView?.getComputedStyle(this.canvas)

		this.padding.set(
			parseInt(canvasStyle?.paddingLeft || "0") || 0,
			parseInt(canvasStyle?.paddingTop || "0") || 0,
		)
		this.border.set(
			parseInt(canvasStyle?.borderLeft || "0") || 0,
			parseInt(canvasStyle?.borderTop || "0") || 0,
		)
	}

	private onPointerEvent(e: PointerEvent): void {
		this.mouse.position.set(
			e.clientX -
				(this.rect?.left ?? 0) -
				this.border.width -
				this.padding.width,
			e.clientY -
				(this.rect?.top ?? 0) -
				this.border.height -
				this.padding.height,
		)

		this.mouse.button = e.buttons
	}

	private onKeyboardEvent(e: KeyboardEvent): void {
		if (e.type == "keydown") {
			this.keyboard[e.key.toLowerCase()] = true
		} else {
			delete this.keyboard[e.key.toLowerCase()]
		}
	}

	private onBlurEvent(): void {
		this.keyboard = {}
	}

	private addEventListeners(): void {
		this.onPointerEvent = this.onPointerEvent.bind(this)
		this.canvas.addEventListener("pointermove", this.onPointerEvent)
		this.canvas.addEventListener("pointerdown", this.onPointerEvent)
		this.canvas.addEventListener("pointerup", this.onPointerEvent)

		this.onKeyboardEvent = this.onKeyboardEvent.bind(this)
		addEventListener("keydown", this.onKeyboardEvent)
		addEventListener("keyup", this.onKeyboardEvent)

		this.onBlurEvent = this.onBlurEvent.bind(this)
		addEventListener("blur", this.onBlurEvent)
	}

	public destroy(): void {
		this.canvas.removeEventListener("pointermove", this.onPointerEvent)
		this.canvas.removeEventListener("pointerdown", this.onPointerEvent)
		this.canvas.removeEventListener("pointerup", this.onPointerEvent)

		removeEventListener("keydown", this.onKeyboardEvent)
		removeEventListener("keyup", this.onKeyboardEvent)

		removeEventListener("blur", this.onBlurEvent)
	}
}
