import { Render, Text, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const FpsCounter: FC = () => {
	const fpsCounter = useRef(
		new Text({
			suffix: " fps",
			fontSize: 30,
			position: [0, 0],
			stroke: true,
		}),
	)

	const elapsedTimeLastFrames = useRef<number[]>([])
	const frameCount = useRef(0)
	const framesUsed = 10

	useFrame(({ clock }) => {
		const frames = elapsedTimeLastFrames.current
		const elapsedTime = clock.getElapsedTime()

		if (frames.length && frameCount.current % 30 == 0) {
			fpsCounter.current.text = Math.round(
				1000 / ((elapsedTime - frames[0]) / frames.length),
			)
		}

		frameCount.current++

		if (frames.length > framesUsed) {
			frames.splice(0, frames.length - framesUsed)
		}

		frames.push(elapsedTime)
	})

	return (
		<>
			<Render object={fpsCounter} />
			{/* <Render
				object={useRef(fpsCounter.current.getBoundingBoxRectangle())}
			/> */}
		</>
	)
}
