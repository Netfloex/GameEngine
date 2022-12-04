import { Picture, Position, useAddObject, useFrame } from "gameengine"
import { FC, useRef } from "react"

export const HamburgerPicture: FC = () => {
	const hamburger = useRef(
		new Picture({
			position: new Position(400, 400),
			size: { width: 100, height: 100 },
			src: "/hamburger.svg",
		}),
	)

	useFrame(({ clock }) => {
		hamburger.current.rotation = clock.getElapsedTime() * 0.0005
		hamburger.current.alpha =
			(1 + Math.sin(clock.getElapsedTime() * 0.0005)) / 2
	})

	useAddObject(hamburger)

	return null
}
