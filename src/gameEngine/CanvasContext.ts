import { Scene } from "@ge/Scene"

import { createContext, createRef, MutableRefObject } from "react"

export const CanvasContext = createContext<MutableRefObject<Scene | null>>(
	createRef(),
)
