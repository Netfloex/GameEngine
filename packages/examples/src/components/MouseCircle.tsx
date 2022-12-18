import { Circle, Position, Rectangle, Render, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const MouseCircle: FC = () => {
	const mouseCircle = useRef(
		new Circle({
			radius: 40,
			// stroke: true,
			strokeWidth: 2,
		}),
	)
	const otherMouse = useRef(
		new Circle({
			position: [100, 100],
			radius: mouseCircle.current.radius,
			color: "blue",
		}),
	)
	const rect = useRef(
		new Rectangle({
			position: [900, 600],
			color: "black",
			size: [200, 400],
		}),
	)
	const staticRect = useRef(
		new Rectangle({
			position: [900, 600],
			color: "white",
			size: [200, 400],
			alpha: 0.5,
		}),
	)
	useFrame((scene) => {
		mouseCircle.current.position.copyFrom(scene.mouse.worldPosition)

		// const collision = scene.objects.find(
		// 	(o) =>
		// 		o !== mouseCircle.current &&
		// 		mouseCircle.current.isCollidingWith(o),
		// )
		const collision = mouseCircle.current.isCollidingWith(rect.current)
		// if (collision && scene.mouse.button) {
		// 	collision.visible = false

		// 	setTimeout(() => {
		// 		collision.visible = true
		// 	}, 1000)
		// }
		rect.current.color = collision ? "cornflowerblue" : "black"

		mouseCircle.current.color = collision
			? "#4CAF50"
			: scene.mouse.button
			? "red"
			: "white"
		const rot = rect.current.rotation

		const s = Math.sin(rot)
		const c = Math.cos(rot)
		const newPos = mouseCircle.current.position
			.clone()
			.subtract(rect.current.position)
		const newerPos = new Position()
		newerPos.x = newPos.x * c + newPos.y * s
		newerPos.y = newPos.x * s - newPos.y * c
		newerPos.add(rect.current.position)
		otherMouse.current.position.copyFrom(newerPos)
		if (!collision) rect.current.rotation += 0.01
	})

	return (
		<>
			<Render object={staticRect} />
			<Render object={rect} />
			<Render object={otherMouse} />
			<Render object={mouseCircle} />
		</>
	)
}
