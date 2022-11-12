import { Scene } from "@ge/Scene"
import { registerCanvas } from "@ge/registerCanvas"

import { RefObject, useEffect, useState } from "react"

export const useCanvas = (
	canvasRef: RefObject<HTMLCanvasElement>,
): Scene | null => {
	const [scene, setScene] = useState<Scene | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const scene = registerCanvas(canvasRef.current)
			setScene(scene)

			let stop = false
			const frame = (): void => {
				scene.tick()
				if (!stop) requestAnimationFrame(frame)
			}
			frame()

			return () => {
				stop = true
			}
		}
	}, [canvasRef])

	return scene
}
