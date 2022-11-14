import { Scene } from "@ge/Scene"
import { Camera } from "@ge/renderObjects/Camera"

export const createScene = (
	canvas: HTMLCanvasElement,
	camera: Camera,
): Scene => {
	return new Scene(canvas, camera)
}
