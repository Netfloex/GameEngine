import {
	Position,
	Rectangle,
	useFrame,
	useScene,
	rectangleRectangleCollision,
} from "gameengine"
import { FC, MutableRefObject, useRef } from "react"

export const BouncingRectangle: FC<{
	collideRectangle: MutableRefObject<Rectangle>
}> = ({ collideRectangle }) => {
	const bouncingRectangle = useRef(
		new Rectangle({
			position: new Position(100, 280),
			size: { width: 30, height: 160 },
			color: "red",
		}),
	)

	const velocityX = useRef(4)

	useScene((scene) => {
		scene.objects.push(bouncingRectangle.current)
	})

	useFrame((scene) => {
		bouncingRectangle.current.color = rectangleRectangleCollision(
			bouncingRectangle.current,
			collideRectangle.current,
		)
			? "green"
			: "red"

		bouncingRectangle.current.position.x += velocityX.current

		if (bouncingRectangle.current.position.x > scene.width) {
			velocityX.current *= -1
			bouncingRectangle.current.stroke = true
			bouncingRectangle.current.strokeWidth = Math.floor(
				Math.random() * 30,
			)
		} else if (bouncingRectangle.current.position.x < 0) {
			velocityX.current *= -1
			bouncingRectangle.current.stroke = false
		}
	})

	return null
}
