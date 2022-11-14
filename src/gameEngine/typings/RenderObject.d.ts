import { Camera } from "@ge/renderObjects/Camera"

export interface RenderObject {
	render(ctx: CanvasRenderingContext2D, camera: Camera): void
}
