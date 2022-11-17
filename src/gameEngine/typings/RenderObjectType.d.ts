import { Camera } from "@ge/classes/Camera"

export interface RenderObjectType {
	render(ctx: CanvasRenderingContext2D, camera: Camera): void
}
