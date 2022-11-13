import { Canvas, useFrame, useScene } from "@gameEngine"

import { NextPage } from "next"
import { FC, useRef } from "react"

import { useWindowSize } from "@hooks"

const RenderComponent: FC = () => {
	const obj = useRef({ x: 100, y: 100, radius: 100 })
	const velocityX = useRef(10)

	useScene((scene) => {
		scene.objects.push({ x: 10, y: 10, radius: 10 })
		scene.objects.push(obj.current)
	})

	useFrame((scene) => {
		obj.current.x += velocityX.current
		if (obj.current.x > scene.width) {
			velocityX.current *= -1
		} else if (obj.current.x < 0) {
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
