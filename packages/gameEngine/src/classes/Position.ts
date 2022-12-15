import { PositionArray, PositionObject } from "@typings/optionable/Positionable"

type PositionLikeArguments = PositionArray | [PositionObject] | []

export class Position {
	x = 0
	y = 0

	constructor(...args: PositionLikeArguments) {
		this.set(...args)
	}

	public add(other: Position): Position {
		this.x += other.x
		this.y += other.y

		return this
	}

	public subtract(other: Position): Position {
		this.x -= other.x
		this.y -= other.y

		return this
	}

	public squaredDistanceTo(other: Position): number {
		return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
	}

	public distanceTo(other: Position): number {
		return Math.sqrt(this.squaredDistanceTo(other))
	}

	public equals(other: Position): boolean {
		return this.x == other.x && this.y == other.y
	}

	public copyFrom(other: Position): Position {
		this.x = other.x
		this.y = other.y

		return this
	}

	public set(
		...args:
			| PositionLikeArguments
			| [(state: Position) => PositionLikeArguments]
	): Position {
		if (args.length == 2) {
			this.x = args[0]
			this.y = args[1]
		} else if (args.length == 1 && typeof args[0] == "object") {
			this.x = args[0].x
			this.y = args[0].y
		} else if (args.length == 1 && typeof args[0] == "function") {
			const data = args[0](this)
			this.set(...data)
		}

		return this
	}

	public clone(): Position {
		return new Position(this.x, this.y)
	}
}
