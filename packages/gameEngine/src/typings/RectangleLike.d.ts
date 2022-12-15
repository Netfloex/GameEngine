import { Positionable } from "@typings/optionable/Positionable"
import { Rotatable } from "@typings/optionable/Rotatable"
import { SizeObject } from "@typings/optionable/Sizable"
import { Strokable } from "@typings/optionable/Strokable"

export interface RectangleLike extends Positionable, Strokable, Rotatable {
	size: SizeObject
}
