import { PositionArray, PositionObject } from "@typings/optionable/Positionable"

type PositionLikeArguments = [number] | PositionArray | [PositionObject] | []

export class Position {
	x = 0
	y = 0

	private parsePositionLike(
		...args:
			| PositionLikeArguments
			| [(state: Position) => PositionLikeArguments]
	): PositionObject {
		if (args.length == 2) {
			return {
				x: args[0],
				y: args[1],
			}
		} else if (args.length == 1 && typeof args[0] == "object") {
			return {
				x: args[0].x,
				y: args[0].y,
			}
		} else if (args.length == 1 && typeof args[0] == "function") {
			const data = args[0](this)
			return this.parsePositionLike(...data)
		} else if (args.length == 1 && typeof args[0] == "number") {
			return {
				x: args[0],
				y: args[0],
			}
		}

		return {
			x: 0,
			y: 0,
		}
	}

	constructor(...args: PositionLikeArguments) {
		this.set(...args)
	}

	public add(...other: PositionLikeArguments): Position {
		const parsed = this.parsePositionLike(...other)
		this.x += parsed.x
		this.y += parsed.y

		return this
	}

	public subtract(...other: PositionLikeArguments): Position {
		const parsed = this.parsePositionLike(...other)

		this.x -= parsed.x
		this.y -= parsed.y

		return this
	}

	public squaredDistanceTo(...other: PositionLikeArguments): number {
		const parsed = this.parsePositionLike(...other)
		return Math.pow(this.x - parsed.x, 2) + Math.pow(this.y - parsed.y, 2)
	}

	public distanceTo(...other: PositionLikeArguments): number {
		const parsed = this.parsePositionLike(...other)

		return Math.sqrt(this.squaredDistanceTo(parsed))
	}

	public equals(...other: PositionLikeArguments): boolean {
		const parsed = this.parsePositionLike(...other)

		return this.x == parsed.x && this.y == parsed.y
	}

	public copyFrom(...other: PositionLikeArguments): Position {
		const parsed = this.parsePositionLike(...other)

		this.x = parsed.x
		this.y = parsed.y

		return this
	}

	public set(
		...args:
			| PositionLikeArguments
			| [(state: Position) => PositionLikeArguments]
	): Position {
		const parsed = this.parsePositionLike(...args)

		this.x = parsed.x
		this.y = parsed.y

		return this
	}

	public scale(
		...args:
			| PositionLikeArguments
			| [(state: Position) => PositionLikeArguments]
	): Position {
		const parsed = this.parsePositionLike(...args)

		this.x *= parsed.x
		this.y *= parsed.y

		return this
	}

	public clone(): Position {
		return new Position(this.x, this.y)
	}
}
