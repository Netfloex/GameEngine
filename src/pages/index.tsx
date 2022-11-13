import { Canvas, Circle, useFrame, useScene } from "@gameEngine"

import { NextPage } from "next"
import { FC, useRef } from "react"

import { useWindowSize } from "@hooks"

const RenderComponent: FC = () => {
	const sideBounceCircle = useRef(
		new Circle({
			position: { x: 100, y: 100 },
			radius: 50,
			color: "red",
		}),
	)

	const velocityX = useRef(10)

	useScene((scene) => {
		scene.objects.push(
			new Circle({
				position: { x: 10, y: 10 },
				radius: 5,
				color: "white",
			}),
		)

		scene.objects.push(sideBounceCircle.current)
	})

	useFrame((scene) => {
		sideBounceCircle.current.position.x += velocityX.current
		if (sideBounceCircle.current.position.x > scene.width) {
			velocityX.current *= -1
		} else if (sideBounceCircle.current.position.x < 0) {
			velocityX.current *= -1
		}
	})

	return null
}

const Page: NextPage = () => {
	const size = useWindowSize()

	return (
		<>
			<Canvas width={size.width} height={size.height}>
				<RenderComponent />
			</Canvas>
		</>
	)
}

export default Page
