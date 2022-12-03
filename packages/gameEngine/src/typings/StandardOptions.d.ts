import { Alphable } from "@typings/Alphable"
import { Positionable } from "@typings/Positionable"
import { Rotatable } from "@typings/Rotatable"

export interface StandardOptions
	extends Positionable,
		Partial<Alphable & Rotatable> {}
