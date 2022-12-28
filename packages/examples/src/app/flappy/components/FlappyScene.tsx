import { Bird } from "./Bird"
import { Obstacle } from "./Obstacle"
import { Score } from "./Score"

import { FC, useRef } from "react"

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
