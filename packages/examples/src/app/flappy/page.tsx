"use client"

import { Canvas } from "gameengine"
import { NextPage } from "next"

import { FlappyScene } from "./components/FlappyScene"

import { useWindowSize } from "@hooks"

const Flappy: NextPage = () => {
	const size = useWindowSize()

	return (
		<Canvas width={size.width ?? 0} height={size.height ?? 0}>
			<FlappyScene />
		</Canvas>
	)
}

export default Flappy
