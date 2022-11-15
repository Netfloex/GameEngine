import { Scene } from "@ge/Scene"

import { Camera } from "@ge/classes/Camera"

export const createScene = (
	canvas: HTMLCanvasElement,
	camera: Camera,
): Scene => {
	return new Scene(canvas, camera)
}
