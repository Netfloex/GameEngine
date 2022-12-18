import { Canvas } from "gameengine"
import { NextPage } from "next"
import { NextSeo } from "next-seo"

import { FlappyScene } from "@components/flappy/FlappyScene"

import { useWindowSize } from "@hooks"

const Flappy: NextPage = () => {
	const size = useWindowSize()

	return (
		<>
			<NextSeo title="Flappy Bird" />

			<Canvas width={size.width ?? 0} height={size.height ?? 0}>
				<FlappyScene />
			</Canvas>
		</>
	)
}

export default Flappy
