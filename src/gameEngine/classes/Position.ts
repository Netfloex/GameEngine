type PositionObject = { x: number; y: number }
type PositionLikeArguments = [x: number, y: number] | [PositionObject] | []

export class Position {
	x = 0
	y = 0

	constructor(...args: PositionLikeArguments) {
		if (args.length == 2) {
			this.x = args[0]
			this.y = args[1]
		} else if (args.length == 1) {
			this.x = args[0].x
			this.y = args[0].y
		}
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

	public copyFrom(other: Position): Position {
		this.x = other.x
		this.y = other.y

		return this
	}

	public clone(): Position {
		return new Position(this.x, this.y)
	}

	public squaredDistanceTo(other: Position): number {
		return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
	}

	public distanceTo(other: Position): number {
		return Math.sqrt(this.squaredDistanceTo(other))
	}
}
