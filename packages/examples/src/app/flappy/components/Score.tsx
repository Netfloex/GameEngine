import { Render, Text, useFrame } from "gameengine"
import { FC, MutableRefObject, useCallback, useRef } from "react"

export const Score: FC<{ scoreRef: MutableRefObject<number> }> = ({
	scoreRef,
}) => {
	const score = useRef(
		new Text({
			prefix: "Score: ",
			fontSize: 30,
		}),
	)
	const highScore = useRef(
		new Text({
			prefix: "High Score: ",
			fontSize: 30,
		}),
	)
	const highScoreRef = useRef(0)

	useFrame(
		useCallback(
			(scene) => {
				score.current.text = scoreRef.current
				highScore.current.text = highScoreRef.current
				score.current.position.copyFrom(scene.camera.position).add(5, 5)
				highScore.current.position
					.copyFrom(scene.camera.position)
					.add(5, 50)
				highScoreRef.current = Math.max(
					scoreRef.current,
					highScoreRef.current,
				)
			},
			[scoreRef],
		),
	)

	return (
		<>
			<Render object={score} />
			<Render object={highScore} />
		</>
	)
}
