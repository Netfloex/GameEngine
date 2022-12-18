import { Position, Render, Text, useFrame } from "gameengine"
import { FC, MutableRefObject, useMemo, useRef } from "react"

export const Score: FC<{ scoreRef: MutableRefObject<number> }> = ({
	scoreRef,
}) => {
	const score = useRef(
		new Text({
			prefix: "Score: ",
			text: 0,
			fontSize: 30,
		}),
	)
	const highScore = useRef(
		new Text({
			prefix: "High Score: ",
			text: 0,
			fontSize: 30,
		}),
	)
	const highScoreRef = useRef(0)

	const scorePositionOffset = useMemo(() => new Position(5, 5), [])
	const highScorePositionOffset = useMemo(() => new Position(5, 50), [])

	useFrame((scene) => {
		score.current.text = scoreRef.current
		highScore.current.text = highScoreRef.current
		score.current.position
			.copyFrom(scene.camera.position)
			.add(scorePositionOffset)
		highScore.current.position
			.copyFrom(scene.camera.position)
			.add(highScorePositionOffset)
		highScoreRef.current = Math.max(scoreRef.current, highScoreRef.current)
	})

	return (
		<>
			<Render object={score} />
			<Render object={highScore} />
		</>
	)
}
