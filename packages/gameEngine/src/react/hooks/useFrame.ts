import { Scene } from "@classes/Scene"

import { useScene } from "@hooks/useScene"

type Destructor = () => void
type useFrameCallbackEffect = (scene: Scene) => void | Destructor

export const useFrame = (callback: useFrameCallbackEffect): void => {
	useScene((scene) => {
		scene.on("tick", callback)

		return () => {
			scene.off("tick", callback)
		}
	})
}
