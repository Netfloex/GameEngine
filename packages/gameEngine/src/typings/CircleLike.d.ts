import { Positionable } from "@typings/Positionable"
import { Strokable } from "@typings/Strokable"

export interface CircleLike extends Positionable, Strokable {
	radius: number
}
