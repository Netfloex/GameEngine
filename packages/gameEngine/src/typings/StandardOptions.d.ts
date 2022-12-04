import { Alphable } from "@typings/optionable/Alphable"
import { PositionableLike } from "@typings/optionable/Positionable"
import { Rotatable } from "@typings/optionable/Rotatable"

export type StandardOptions = Partial<PositionableLike & Alphable & Rotatable>
