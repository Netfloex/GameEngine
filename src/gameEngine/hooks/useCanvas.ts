import { Scene } from "@ge/Scene"
import { registerCanvas } from "@ge/registerCanvas"

import { MutableRefObject, RefObject, useEffect, useRef } from "react"

export const useCanvas = (
	canvasRef: RefObject<HTMLCanvasElement>,
): MutableRefObject<Scene | null> => {
	const sceneRef = useRef<Scene | null>(null)

	const animationFrameRef = useRef<number | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const scene = registerCanvas(canvasRef.current)
			sceneRef.current = scene

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

	return sceneRef
}
