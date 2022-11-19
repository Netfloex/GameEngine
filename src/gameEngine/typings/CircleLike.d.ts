import { Positionable } from "@ge/typings/Positionable"
import { Strokable } from "@ge/typings/Strokable"

export interface CircleLike extends Positionable, Strokable {
	radius: number
}
