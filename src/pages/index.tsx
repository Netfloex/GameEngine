import { Canvas, Circle, Position, useFrame, useScene } from "@gameEngine"

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
			position: new Position(),
			radius: 10,
			color: "white",
			stroke: true,
		}),
	)

	const velocityX = useRef(10)

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

		scene.objects.push(sideBounceCircle.current, mouseCircle.current)
	})

	useFrame((scene) => {
		mouseCircle.current.position.copyFrom(scene.mouse.worldPosition)

		mouseCircle.current.color = scene.mouse.button ? "#4CAF50" : "white"

		sideBounceCircle.current.position.x += velocityX.current
		if (sideBounceCircle.current.position.x > scene.width) {
			velocityX.current *= -1
			sideBounceCircle.current.stroke = true
			sideBounceCircle.current.strokeWidth = Math.floor(
				Math.random() * 100,
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
