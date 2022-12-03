import { Position, Rectangle, useAddObject, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const RotatingSquare: FC = () => {
	const rectangleRef = useRef(
		new Rectangle({
			color: "darkorange",
			position: new Position(200, 200),
			alpha: 0.5,
			size: { width: 50, height: 50 },
		}),
	)

	useAddObject(rectangleRef)

	useFrame(() => {
		rectangleRef.current.rotation += 0.05
	})

	return null
}
