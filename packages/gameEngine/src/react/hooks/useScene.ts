import { Scene } from "@classes/Scene"
import { CanvasContext } from "@react/CanvasContext"

import { useContext } from "react"

export const useScene = (): Scene => {
	const sceneRef = useContext(CanvasContext)

	if (sceneRef.current == false) {
		throw new Error("Please use this hook only inside the canvas component")
	}
	if (sceneRef.current == null) {
		throw new Error("sceneRef.current == null")
	}

	return sceneRef.current
}
