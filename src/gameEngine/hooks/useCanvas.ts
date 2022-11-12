import { registerCanvas } from "@ge/registerCanvas"
import { Scene } from "@ge/typings/Scene"

import { RefObject, useEffect, useState } from "react"

export const useCanvas = (
	canvasRef: RefObject<HTMLCanvasElement>,
): Scene | null => {
	const [scene, setScene] = useState<Scene | null>(null)

	useEffect(() => {
		if (canvasRef.current) setScene(registerCanvas(canvasRef.current))
	}, [canvasRef])

	return scene
}
