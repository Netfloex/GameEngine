import { Canvas } from "@gameEngine"
import { useScene } from "@gameEngine"

import { NextPage } from "next"
import { FC } from "react"
import { useWindowSize } from "src/hooks/useWindowSize"

const RenderComponent: FC = () => {
	useScene((scene) => {
		scene.moveTo(0, 0)
		scene.lineTo(200, 100)
		scene.strokeStyle = "white"
		scene.stroke()
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
