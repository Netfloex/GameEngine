import {
	Canvas,
	Circle,
	Position,
	Rectangle,
	useFrame,
	useScene,
} from "@gameEngine"
import { circleRectangleCollision } from "@ge/utils/collision/circleRectangle"
import { rectangleRectangleCollision } from "@ge/utils/collision/rectangleRectangle"

import { NextPage } from "next"
import { FC, useRef } from "react"

import { useWindowSize } from "@hooks"

const RenderComponent: FC = () => {
	const sideBounceCircle = useRef(
		new Circle({
			position: new Position(100, 100),
			radius: 50,
			color: "red",
		}),
	)

	const mouseCircle = useRef(
		new Circle({
			position: new Position(-100, -100),
			radius: 10,
			color: "white",
			stroke: true,
			strokeWidth: 2,
		}),
	)

	const collideRectangle = useRef(
		new Rectangle({
			position: new Position(300, 20),
			size: { width: 30, height: 280 },
			color: "white",
		}),
	)

	const movingRectangle = useRef(
		new Rectangle({
			position: new Position(100, 280),
			size: { width: 30, height: 160 },
			color: "red",
		}),
	)

	const velocityX = useRef(4)

	useScene((scene) => {
		scene.objects.push(
			new Circle({
				position: new Position(0, 0),
				radius: 10,
				color: "white",
			}),
			new Circle({
				position: new Position(scene.width, 0),
				radius: 10,
				color: "white",
			}),
			new Circle({
				position: new Position(0, scene.height),
				radius: 10,
				color: "white",
			}),
			new Circle({
				position: new Position(scene.width, scene.height),
				radius: 10,
				color: "white",
			}),
		)

		scene.objects.push(
			collideRectangle.current,
			sideBounceCircle.current,
			mouseCircle.current,
			movingRectangle.current,
		)
	})

	useFrame((scene) => {
		mouseCircle.current.position.copyFrom(scene.mouse.worldPosition)

		const collide = circleRectangleCollision(
			mouseCircle.current,
			collideRectangle.current,
		)

		mouseCircle.current.color = collide
			? "#4CAF50"
			: scene.mouse.button
			? "red"
			: "white"
		mouseCircle.current.stroke = true

		sideBounceCircle.current.color = circleRectangleCollision(
			sideBounceCircle.current,
			collideRectangle.current,
		)
			? "green"
			: "red"

		movingRectangle.current.color = rectangleRectangleCollision(
			collideRectangle.current,
			movingRectangle.current,
		)
			? "green"
			: "red"

		sideBounceCircle.current.position.x += velocityX.current
		movingRectangle.current.position.x += velocityX.current

		if (sideBounceCircle.current.position.x > scene.width) {
			velocityX.current *= -1
			sideBounceCircle.current.stroke = true
			sideBounceCircle.current.strokeWidth = Math.floor(
				Math.random() * 30,
			)
		} else if (sideBounceCircle.current.position.x < 0) {
			velocityX.current *= -1
			sideBounceCircle.current.stroke = false
		}

		if (scene.keyboard["a"]) {
			scene.camera.position.x -= 5
		}
		if (scene.keyboard["d"]) {
			scene.camera.position.x += 5
		}
		if (scene.keyboard["s"]) {
			scene.camera.position.y += 5
		}
		if (scene.keyboard["w"]) {
			scene.camera.position.y -= 5
		}
	})

	return null
}

const Page: NextPage = () => {
	const size = useWindowSize()
	const margin = 40

	return (
		<>
			<Canvas
				style={{ margin }}
				width={(size.width ?? 0) - margin * 2}
				height={(size.height ?? 0) - margin * 2}
			>
				<RenderComponent />
			</Canvas>
		</>
	)
}

export default Page
