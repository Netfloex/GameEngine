import { Alphable } from "@typings/Alphable"
import { PositionableLike } from "@typings/Positionable"
import { Rotatable } from "@typings/Rotatable"

export interface StandardOptions
	extends PositionableLike,
		Partial<Alphable & Rotatable> {}
