import { Rectangle, useAddObject, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const BouncingRectangle: FC = () => {
	const bouncingRectangle = useRef(
		new Rectangle({
			position: [100, 280],
			size: [30, 160],
			color: "red",
		}),
	)

	const velocityX = useRef(1)

	useAddObject(bouncingRectangle)

	useFrame((scene) => {
		bouncingRectangle.current.color =
			bouncingRectangle.current.isCollidingWith(
				scene.objects.filter((o) => o !== bouncingRectangle.current),
			)
				? "green"
				: "red"

		bouncingRectangle.current.position.x += velocityX.current

		if (bouncingRectangle.current.position.x > scene.width) {
			velocityX.current = -1 * Math.abs(velocityX.current)
			bouncingRectangle.current.stroke = true
			bouncingRectangle.current.strokeWidth = Math.floor(
				Math.random() * 30,
			)
		} else if (bouncingRectangle.current.position.x < 0) {
			velocityX.current = Math.abs(velocityX.current)
			bouncingRectangle.current.stroke = false
		}
	})

	return null
}
