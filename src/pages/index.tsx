import { Canvas } from "@gameEngine"
import { useScene } from "@gameEngine"

import { NextPage } from "next"
import { FC } from "react"
import { useWindowSize } from "src/hooks/useWindowSize"

const RenderComponent: FC = () => {
	useScene((scene) => {
		scene.objects.push({ x: 10, y: 10, radius: 10 })
		scene.objects.push({ x: 100, y: 100, radius: 100 })
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
