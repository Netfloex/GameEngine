import { RenderObject } from "@ge/renderObjects/RenderObject"

interface EventListeners {
	tick: Array<(scene: Scene) => void>
}

export class Scene {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	public objects: RenderObject[] = []

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.ctx = canvas.getContext("2d")!
	}

	public tick(): void {
		this.emit("tick", this)

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.objects.forEach((obj) => {
			obj.render(this.ctx)
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

	/* 
		Event Listeners
	*/

	private eventListeners: EventListeners = { tick: [] }

	private emit<T extends keyof EventListeners>(
		eventName: T,
		...data: Parameters<EventListeners[T][0]>
	): void {
		// eslint-disable-next-line prefer-spread
		this.eventListeners[eventName].forEach((cb) => cb.apply(null, data))
	}

	public on<T extends keyof EventListeners>(
		eventName: T,
		listener: EventListeners[T][0],
	): void {
		this.eventListeners[eventName].push(listener)
	}

	public off<T extends keyof EventListeners>(
		eventName: T,
		listener: EventListeners[T][0],
	): void {
		const index = this.eventListeners[eventName].indexOf(listener)

		if (index > -1) this.eventListeners[eventName].splice(index, 1)
	}
}
