import { Text, useAddObject, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const FpsCounter: FC = () => {
	const fpsCounter = useRef(
		new Text({
			text: "0",
			fontSize: 30,
			position: [0, 0],
		}),
	)

	const elapsedTimeLastFrames = useRef<number[]>([])
	const frameCount = useRef(0)
	const framesUsed = 10

	useFrame(({ clock }) => {
		const frames = elapsedTimeLastFrames.current
		const elapsedTime = clock.getElapsedTime()

		if (frames.length && frameCount.current % 30 == 0) {
			fpsCounter.current.text = clock.getElapsedTime()
			fpsCounter.current.text =
				Math.round(1000 / ((elapsedTime - frames[0]) / frames.length)) +
				" fps"
		}

		frameCount.current++

		if (frames.length > framesUsed) {
			frames.splice(0, frames.length - framesUsed)
		}

		frames.push(elapsedTime)
	})

	useAddObject(fpsCounter)

	return null
}
