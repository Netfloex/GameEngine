import { Scene } from "@ge/Scene"
import { createScene } from "@ge/createScene"

import { MutableRefObject, RefObject, useEffect, useRef } from "react"

import { Camera } from "@ge/classes/Camera"

export const useCanvas = (
	canvasRef: RefObject<HTMLCanvasElement>,
	cameraRef: MutableRefObject<Camera>,
): MutableRefObject<Scene | null> => {
	const sceneRef = useRef<Scene | null>(null)

	const animationFrameRef = useRef<number | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const scene = createScene(canvasRef.current, cameraRef.current)
			sceneRef.current = scene

			const frame = (): void => {
				scene.tick()

				animationFrameRef.current = requestAnimationFrame(frame)
			}

			frame()

			return () => {
				if (animationFrameRef.current)
					cancelAnimationFrame(animationFrameRef.current)

				scene.destroy()
			}
		}
	}, [canvasRef, cameraRef])

	return sceneRef
}