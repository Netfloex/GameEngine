import { Camera } from "@classes/Camera"
import { Scene } from "@classes/Scene"

export const createScene = (
	canvas: HTMLCanvasElement,
	camera: Camera,
): Scene => {
	return new Scene(canvas, camera)
}
