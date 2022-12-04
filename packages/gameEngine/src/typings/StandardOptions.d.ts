import { Alphable } from "@typings/optionable/Alphable"
import { PositionableLike } from "@typings/optionable/Positionable"
import { Rotatable } from "@typings/optionable/Rotatable"

export interface StandardOptions
	extends PositionableLike,
		Partial<Alphable & Rotatable> {}
