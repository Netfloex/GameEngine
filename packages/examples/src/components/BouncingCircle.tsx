import { Circle, Position, useAddObject, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const BouncingCircle: FC = () => {
	const bouncingCircle = useRef(
		new Circle({
			position: new Position(100, 100),
			radius: 50,
			color: "red",
		}),
	)
	const velocityX = useRef(4)

	useAddObject(bouncingCircle)

	useFrame((scene) => {
		bouncingCircle.current.color = bouncingCircle.current.isCollidingWith(
			scene.objects.filter((o) => o !== bouncingCircle.current),
		)
			? "green"
			: "red"

		bouncingCircle.current.position.x += velocityX.current

		if (bouncingCircle.current.position.x > scene.width) {
			velocityX.current = -1 * Math.abs(velocityX.current)
			bouncingCircle.current.stroke = true
			bouncingCircle.current.strokeWidth = Math.floor(Math.random() * 30)
		} else if (bouncingCircle.current.position.x < 0) {
			velocityX.current = Math.abs(velocityX.current)
			bouncingCircle.current.stroke = false
		}
	})

	return null
}
