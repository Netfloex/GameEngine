import { useScene, Rectangle, Circle, Render } from "gameengine"
import { FC, useRef } from "react"

export const StaticObjects: FC = () => {
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
