import { Scene } from "@ge/Scene"
import { registerCanvas } from "@ge/registerCanvas"

import { RefObject, useEffect, useState, useRef } from "react"

export const useCanvas = (
	canvasRef: RefObject<HTMLCanvasElement>,
): Scene | null => {
	const [scene, setScene] = useState<Scene | null>(null)

	const animationFrameRef = useRef<number | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const scene = registerCanvas(canvasRef.current)
			setScene(scene)

			const frame = (): void => {
				scene.tick()

				animationFrameRef.current = requestAnimationFrame(frame)
			}

			frame()

			return () => {
				if (animationFrameRef.current)
					cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [canvasRef])

	return scene
}
