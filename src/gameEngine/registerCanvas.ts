import { Scene } from "@ge/Scene"

export const registerCanvas = (canvas: HTMLCanvasElement): Scene => {
	return new Scene(canvas)
}
