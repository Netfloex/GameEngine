import { Scene } from "@ge/Scene"

import { useScene } from "@ge/hooks/useScene"

type Destructor = () => void
type useFrameCallbackEffect = (scene: Scene) => void | Destructor

export const useFrame = (callback: useFrameCallbackEffect): void => {
	useScene((scene) => {
		scene.on("tick", callback)
		console.log("register tick")

		return () => {
			scene.off("tick", callback)
			console.log("unregister tick")
		}
	})
}
