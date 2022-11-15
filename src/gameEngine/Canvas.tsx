import { CanvasContext } from "@ge/CanvasContext"

import { CanvasHTMLAttributes, DetailedHTMLProps, useRef } from "react"

import { Camera } from "@ge/classes/Camera"

import { useCanvas } from "@ge/hooks/useCanvas"

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
	const cameraRef = useRef<Camera>(
		camera ?? new Camera({ position: { x: 0, y: 0 } }),
	)

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
