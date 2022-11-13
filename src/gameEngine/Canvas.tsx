import { CanvasContext } from "@ge/CanvasContext"
import { FCC } from "@typings/FCC"

import { CanvasHTMLAttributes, DetailedHTMLProps, useRef } from "react"

import { useCanvas } from "@ge/hooks/useCanvas"

export const Canvas: FCC<
	DetailedHTMLProps<
		CanvasHTMLAttributes<HTMLCanvasElement>,
		HTMLCanvasElement
	>
> = ({ children, ...canvasProps }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const sceneRef = useCanvas(canvasRef)

	return (
		<>
			<CanvasContext.Provider value={sceneRef}>
				<canvas {...canvasProps} ref={canvasRef} />
				{children}
			</CanvasContext.Provider>
		</>
	)
}
