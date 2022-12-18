import { FC, useRef } from "react"

import { Bird } from "@components/flappy/Bird"
import { Obstacle } from "@components/flappy/Obstacle"
import { Score } from "@components/flappy/Score"

const obstacleDistance = 600

export const FlappyScene: FC = () => {
	const scoreRef = useRef(0)

	return (
		<>
			<Bird scoreRef={scoreRef} obstacleDistance={obstacleDistance} />
			{Array.from({ length: 100 }).map((_, i) => (
				<Obstacle key={i} x={(i + 1) * obstacleDistance} />
			))}
			<Score scoreRef={scoreRef} />
		</>
	)
}
