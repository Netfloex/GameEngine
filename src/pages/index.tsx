import { Canvas, Circle, Position, Rectangle, useScene } from "@gameEngine"

import { NextPage } from "next"
import { FC, MutableRefObject, useRef } from "react"
import { BouncingCircle } from "src/pages/components/BouncingCircle"
import { BouncingRectangle } from "src/pages/components/BouncingRectangle"
import { Camera } from "src/pages/components/Camera"
import { MouseCircle } from "src/pages/components/MouseCircle"

import { useWindowSize } from "@hooks"

const RenderComponent: FC<{
	collideRectangle: MutableRefObject<Rectangle>
}> = ({ collideRectangle }) => {
	useScene((scene) => {
		scene.objects.push(
			collideRectangle.current,
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
	})

	return null
}

const Page: NextPage = () => {
	const size = useWindowSize()
	const margin = 40

	const collideRectangle = useRef(
		new Rectangle({
			position: new Position(300, 20),
			size: { width: 30, height: 280 },
			color: "white",
		}),
	)

	return (
		<>
			<Canvas
				style={{ margin }}
				width={(size.width ?? 0) - margin * 2}
				height={(size.height ?? 0) - margin * 2}
			>
				<Camera />
				<MouseCircle collideRectangle={collideRectangle} />
				<BouncingCircle collideRectangle={collideRectangle} />
				<BouncingRectangle collideRectangle={collideRectangle} />
				<RenderComponent collideRectangle={collideRectangle} />
			</Canvas>
		</>
	)
}

export default Page
