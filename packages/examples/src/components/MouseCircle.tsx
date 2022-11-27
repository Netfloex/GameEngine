import { Circle, Position, useFrame, useScene } from "gameengine"
import { FC, useRef } from "react"

export const MouseCircle: FC = () => {
	const mouseCircle = useRef(
		new Circle({
			position: new Position(-100, -100),
			radius: 10,
			color: "white",
			stroke: true,
			strokeWidth: 2,
		}),
	)

	useScene((scene) => {
		scene.objects.push(mouseCircle.current)
	})

	useFrame((scene) => {
		mouseCircle.current.position.copyFrom(scene.mouse.worldPosition)

		const collide = scene.objects.find(
			(object) =>
				object !== mouseCircle.current &&
				mouseCircle.current.isCollidingWith(object),
		)

		mouseCircle.current.color = collide
			? "#4CAF50"
			: scene.mouse.button
			? "red"
			: "white"
		mouseCircle.current.stroke = true
	})

	return null
}
