import { Alphable } from "@typings/optionable/Alphable"
import { Nameable } from "@typings/optionable/Nameable"
import { PositionableLike } from "@typings/optionable/Positionable"
import { Rotatable } from "@typings/optionable/Rotatable"

export type StandardOptions = Partial<
	PositionableLike & Alphable & Rotatable & Nameable
>
