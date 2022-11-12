import { CanvasContext } from "@ge/CanvasContext"
import { useCanvas } from "@ge/hooks/useCanvas"
import { FCC } from "@typings/FCC"

import { CanvasHTMLAttributes, DetailedHTMLProps, useRef } from "react"

export const Canvas: FCC<
	DetailedHTMLProps<
		CanvasHTMLAttributes<HTMLCanvasElement>,
		HTMLCanvasElement
	>
> = ({ children, ...canvasProps }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const ctx = useCanvas(canvasRef)

	return (
		<>
			<CanvasContext.Provider value={ctx}>
				<canvas {...canvasProps} ref={canvasRef}></canvas>
				{children}
			</CanvasContext.Provider>
		</>
	)
}
