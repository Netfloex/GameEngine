import {
	Canvas,
	Circle,
	Position,
	Rectangle,
	useAddObject,
	useScene,
} from "gameengine"
import { NextPage } from "next"
import { FC, useRef } from "react"

import { BouncingCircle } from "@components/BouncingCircle"
import { BouncingRectangle } from "@components/BouncingRectangle"
import { HamburgerPicture } from "@components/HamburgerPicture"
import { KeyboardControls } from "@components/KeyboardControls"
import { MouseCircle } from "@components/MouseCircle"
import { RotatingSquare } from "@components/RotatingSquare"

import { useWindowSize } from "@hooks"

const StaticObjects: FC = () => {
	const scene = useScene()

	useAddObject(
		useRef(() => [
			new Rectangle({
				position: new Position(300, 180),
				size: { width: 30, height: 280 },
				alpha: 0.5,
				color: "white",
			}),
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
		]),
	)

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
				<KeyboardControls />
				<BouncingCircle />
				<BouncingRectangle />
				<RotatingSquare />
				<StaticObjects />
				<HamburgerPicture />
				<MouseCircle />
			</Canvas>
		</>
	)
}

export default Page
