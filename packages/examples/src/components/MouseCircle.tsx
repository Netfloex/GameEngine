import { Circle, useAddObject, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const MouseCircle: FC = () => {
	const mouseCircle = useRef(
		new Circle({
			position: [-100, -100],
			radius: 10,
			color: "white",
			stroke: true,
			strokeWidth: 2,
		}),
	)

	useAddObject(mouseCircle)

	useFrame((scene) => {
		mouseCircle.current.position.copyFrom(scene.mouse.worldPosition)

		const collide = mouseCircle.current.isCollidingWith(
			scene.objects.filter((o) => o !== mouseCircle.current),
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
