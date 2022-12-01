import { Scene } from "@classes/Scene"

import { useEffect } from "react"

import { useScene } from "@hooks/useScene"

type Destructor = () => void
type useFrameCallbackEffect = (scene: Scene) => void | Destructor

export const useFrame = (callback: useFrameCallbackEffect): void => {
	const scene = useScene()

	useEffect(() => {
		scene.on("tick", callback)

		return () => {
			scene.off("tick", callback)
		}
	}, [callback, scene])
}
