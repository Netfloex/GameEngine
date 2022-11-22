import { Camera } from "@classes/Camera"
import { Scene } from "@classes/Scene"

import { MutableRefObject, RefObject, useEffect, useRef } from "react"

import { createScene } from "@utils/createScene"

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
