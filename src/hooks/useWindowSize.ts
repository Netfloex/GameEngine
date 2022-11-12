import { useState, useEffect } from "react"

interface Size {
	width: number | undefined
	height: number | undefined
}

export const useWindowSize = (): Size => {
	const [windowSize, setWindowSize] = useState<Size>({
		width: undefined,
		height: undefined,
	})

	useEffect(() => {
		const handleResize = (): void =>
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})

		addEventListener("resize", handleResize)
		handleResize()
		return () => removeEventListener("resize", handleResize)
	}, [])

	return windowSize
}
