import { Canvas, Circle, Rectangle, Render, useScene } from "gameengine"
import { NextPage } from "next"
import { NextSeo } from "next-seo"
import { FC, useRef } from "react"

import { BouncingCircle } from "@components/BouncingCircle"
import { BouncingRectangle } from "@components/BouncingRectangle"
import { FpsCounter } from "@components/FpsCounter"
import { HamburgerPicture } from "@components/HamburgerPicture"
import { KeyboardControls } from "@components/KeyboardControls"
import { MouseCircle } from "@components/MouseCircle"
import { RotatingSquare } from "@components/RotatingSquare"

import { useWindowSize } from "@hooks"

const StaticObjects: FC = () => {
	const scene = useScene()

	const staticObjects = useRef(() => [
		new Rectangle({
			position: [300, 180],
			size: { width: 30, height: 280 },
			alpha: 0.5,
			color: "white",
		}),
		new Circle({
			position: [0, 0],
			radius: 10,
			color: "white",
		}),
		new Circle({
			position: [scene.width, 0],
			radius: 10,
			color: "white",
		}),
		new Circle({
			position: [0, scene.height],
			radius: 10,
			color: "white",
		}),
		new Circle({
			position: [scene.width, scene.height],
			radius: 10,
			color: "white",
		}),
	])

	return <Render object={staticObjects} />
}

const Playground: NextPage = () => {
	const size = useWindowSize()

	return (
		<>
			<NextSeo title="Playground" />
			<Canvas width={size.width ?? 0} height={size.height ?? 0}>
				<KeyboardControls />
				<BouncingCircle />
				<BouncingRectangle />
				<RotatingSquare />
				<StaticObjects />
				<HamburgerPicture />
				<FpsCounter />
				<MouseCircle />
			</Canvas>
		</>
	)
}

export default Playground
