import { Rectangle, Render, useScene } from "gameengine"
import { FC, useRef } from "react"

export const Obstacle: FC<{ x: number }> = ({ x }) => {
	const scene = useScene()

	const height = 200
	const startY = Math.floor(Math.random() * (innerHeight - 75 - height)) + 75

	const obstacleTop = useRef(
		new Rectangle({
			position: [x, startY / 2],
			size: [50, startY],
			name: "obstacle",
			color: "gray",
		}),
	)
	const obstacleBottom = useRef(
		() =>
			new Rectangle({
				position: [
					x,
					startY + height + (scene.height - startY - height) / 2,
				],
				size: [50, scene.height - startY - height],
				color: "gray",
				name: "obstacle",
			}),
	)
	return (
		<>
			<Render object={obstacleTop} />
			<Render object={obstacleBottom} />
		</>
	)
}
