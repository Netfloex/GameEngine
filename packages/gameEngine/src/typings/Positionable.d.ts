import { Position } from "@classes/Position"

export interface Positionable {
	position: Position
}

export interface PositionObject {
	x: number
	y: number
}

export type PositionArray = [x: number, y: number]

export type PositionLike = Position | PositionArray | PositionObject

export interface PositionableLike {
	position: PositionLike
}
