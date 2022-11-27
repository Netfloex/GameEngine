import { Camera } from "@classes/Camera"

export interface RenderObjectType {
	render(ctx: CanvasRenderingContext2D, camera: Camera): void

	type: string
	isCollidingWith(other: RenderObjectType): boolean
}
