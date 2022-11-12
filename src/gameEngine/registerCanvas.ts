import { Scene } from "@ge/typings/Scene"

export const registerCanvas = (canvas: HTMLCanvasElement): Scene | null => {
	const ctx = canvas.getContext("2d")

	return ctx
}
