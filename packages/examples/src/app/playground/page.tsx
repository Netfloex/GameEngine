"use client"

import { Canvas } from "gameengine"
import { NextPage } from "next"
import { StaticObjects } from "src/app/playground/components/StaticObjects"

import { BouncingCircle } from "./components/BouncingCircle"
import { BouncingRectangle } from "./components/BouncingRectangle"
import { FpsCounter } from "./components/FpsCounter"
import { HamburgerPicture } from "./components/HamburgerPicture"
import { KeyboardControls } from "./components/KeyboardControls"
import { MouseCircle } from "./components/MouseCircle"
import { RotatingSquare } from "./components/RotatingSquare"

import { useWindowSize } from "@hooks"

const Playground: NextPage = () => {
	const size = useWindowSize()

	return (
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
	)
}

export default Playground
