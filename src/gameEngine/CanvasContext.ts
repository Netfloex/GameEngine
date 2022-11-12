import { Scene } from "@ge/Scene"

import { createContext } from "react"

export const CanvasContext = createContext<Scene | null>(null)
