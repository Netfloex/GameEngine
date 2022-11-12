import { CanvasContext } from "@ge/CanvasContext"
import { Scene } from "@ge/typings/Scene"

import { useContext, useEffect } from "react"

type Destructor = () => void
type useSceneCallbackEffect = (scene: Scene) => void | Destructor

export const useScene = (callback: useSceneCallbackEffect): void => {
	const scene = useContext(CanvasContext)

	useEffect(() => {
		if (scene) return callback(scene)
	}, [scene, callback])
}
