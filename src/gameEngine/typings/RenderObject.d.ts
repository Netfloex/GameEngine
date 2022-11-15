import { Camera } from "@ge/classes/Camera"

export interface RenderObject {
	render(ctx: CanvasRenderingContext2D, camera: Camera): void
}
