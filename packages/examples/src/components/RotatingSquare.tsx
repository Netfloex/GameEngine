import { Rectangle, useAddObject, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const RotatingSquare: FC = () => {
	const rectangleRef = useRef([
		new Rectangle({
			color: "darkorange",
			position: [200, 200],
			alpha: 0.5,
			size: { width: 50, height: 50 },
		}),
		new Rectangle({
			color: "lightblue",
			position: [200, 300],
			alpha: 0.5,
			size: { width: 50, height: 50 },
		}),
		new Rectangle({
			color: "darkred",
			position: [200, 400],
			alpha: 0.5,
			size: { width: 50, height: 50 },
		}),
	])

	useAddObject(rectangleRef)

	const moveSpeed = 0.05

	useFrame((scene) => {
		rectangleRef.current[0].rotation += moveSpeed
		rectangleRef.current[1].rotation +=
			scene.clock.getDelta() * (moveSpeed / 16)
		rectangleRef.current[2].rotation =
			scene.clock.getElapsedTime() * (moveSpeed / 16)
	})

	return null
}
