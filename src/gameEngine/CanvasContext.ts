import { Scene } from "@ge/Scene"

import { createContext, createRef, MutableRefObject } from "react"

const ref: MutableRefObject<false | null> = createRef()
ref.current = false

export const CanvasContext =
	createContext<MutableRefObject<Scene | false | null>>(ref)
