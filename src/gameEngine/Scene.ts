interface RenderObject {
	x: number
	y: number
	radius: number
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
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.objects.forEach((obj) => {
			this.ctx.beginPath()
			this.ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI)
			this.ctx.fill()
		})
	}
}
