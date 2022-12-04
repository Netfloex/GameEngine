import { Positionable } from "@typings/optionable/Positionable"
import { Strokable } from "@typings/optionable/Strokable"

export interface CircleLike extends Positionable, Strokable {
	radius: number
}
