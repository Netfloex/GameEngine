import { Camera } from "@classes/Camera"
import { CanvasContext } from "@react/CanvasContext"
import { useCanvas } from "@react/hooks/useCanvas"

import { CanvasHTMLAttributes, DetailedHTMLProps, useRef } from "react"

import { FCC } from "@typings/FCC"

export const Canvas: FCC<
	{
		camera?: Camera
	} & DetailedHTMLProps<
		CanvasHTMLAttributes<HTMLCanvasElement>,
		HTMLCanvasElement
	>
> = ({ children, camera, ...canvasProps }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const cameraRef = useRef<Camera>(camera ?? new Camera())

	const sceneRef = useCanvas(canvasRef, cameraRef)

	return (
		<>
			<CanvasContext.Provider value={sceneRef}>
				<canvas {...canvasProps} ref={canvasRef} />
				{children}
			</CanvasContext.Provider>
		</>
	)
}
