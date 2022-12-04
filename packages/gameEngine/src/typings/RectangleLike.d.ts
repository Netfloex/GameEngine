import { Positionable } from "@typings/optionable/Positionable"
import { SizeObject } from "@typings/optionable/Sizable"
import { Strokable } from "@typings/optionable/Strokable"

export interface RectangleLike extends Positionable, Strokable {
	size: SizeObject
}
