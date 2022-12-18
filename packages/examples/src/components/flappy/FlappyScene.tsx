import type { FC } from "react"

import { KeyboardControls } from "@components/KeyboardControls"
import { Bird } from "@components/flappy/Bird"
import { Obstacle } from "@components/flappy/Obstacle"

export const FlappyScene: FC = () => {
	return (
		<>
			<Bird />
			{Array.from({ length: 100 }).map((_, i) => (
				<Obstacle key={i} x={(i + 1) * 600} />
			))}
			<KeyboardControls />
		</>
	)
}
