import { useFrame } from "gameengine"
import type { FC } from "react"

export const KeyboardControls: FC = () => {
	useFrame((scene) => {
		if (scene.keyboard["a"]) {
			scene.camera.position.x -= 5
		}
		if (scene.keyboard["d"]) {
			scene.camera.position.x += 5
		}
		if (scene.keyboard["s"]) {
			scene.camera.position.y += 5
		}
		if (scene.keyboard["w"]) {
			scene.camera.position.y -= 5
		}
	})

	return null
}
