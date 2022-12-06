import { Camera } from "@classes/Camera"

import { RenderObjects } from "@typings/RenderObjects"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface RenderObjectType {
	render(ctx: CanvasRenderingContext2D, camera: Camera): void

	type: string
	isCollidingWith(others: OptionalArray<RenderObjects>): boolean
}
