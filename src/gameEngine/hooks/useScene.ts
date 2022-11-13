import { CanvasContext } from "@ge/CanvasContext"
import { Scene } from "@ge/Scene"

import { useContext, useEffect } from "react"

type Destructor = () => void
type useSceneCallbackEffect = (scene: Scene) => void | Destructor

export const useScene = (callback: useSceneCallbackEffect): void => {
	const sceneRef = useContext(CanvasContext)

	useEffect(() => {
		if (sceneRef.current) return callback(sceneRef.current)
	}, [sceneRef, callback])
}
