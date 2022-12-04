import { Camera } from "@classes/Camera"

import { OptionalArray } from "@typings/utils/OptionalArray"

export interface RenderObjectType {
	render(ctx: CanvasRenderingContext2D, camera: Camera): void

	type: string
	isCollidingWith(others: OptionalArray<RenderObjectType>): boolean
}
