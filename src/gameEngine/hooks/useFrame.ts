import { CanvasContext } from "@ge/CanvasContext"
import { Scene } from "@ge/Scene"

import { useContext, useEffect } from "react"

type Destructor = () => void
type useFrameCallbackEffect = (scene: Scene) => void | Destructor

export const useFrame = (callback: useFrameCallbackEffect): void => {
	const scene = useContext(CanvasContext)

	useEffect(() => {
		if (scene) {
			scene.on("tick", callback)

			return () => {
				scene.off("tick", callback)
			}
		}
	}, [scene, callback])
}
