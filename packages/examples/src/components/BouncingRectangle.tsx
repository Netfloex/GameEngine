import { Position, Rectangle, useAddObject, useFrame } from "gameengine"
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

	useAddObject(bouncingRectangle)

	useFrame((scene) => {
		bouncingRectangle.current.color =
			bouncingRectangle.current.isCollidingWith(collideRectangle.current)
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