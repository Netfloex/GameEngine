import { Scene } from "@ge/typings/Scene"

import { createContext } from "react"

export const CanvasContext = createContext<Scene | null>(null)
