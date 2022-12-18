import { SizeArray, SizeObject } from "@typings/optionable/Sizable"

type SizeLikeArguments = SizeArray | [SizeObject] | []

export class Size {
	width = 0
	height = 0

	private parseSizeLike(
		...args: SizeLikeArguments | [(state: Size) => SizeLikeArguments]
	): SizeObject {
		if (args.length == 2) {
			return {
				width: args[0],
				height: args[1],
			}
		} else if (args.length == 1 && typeof args[0] == "object") {
			return {
				width: args[0].width,
				height: args[0].height,
			}
		} else if (args.length == 1 && typeof args[0] == "function") {
			const data = args[0](this)

			return this.parseSizeLike(...data)
		}

		return {
			width: 0,
			height: 0,
		}
	}

	constructor(...args: SizeLikeArguments) {
		this.set(...args)
	}

	public equals(...other: SizeLikeArguments): boolean {
		const parsed = this.parseSizeLike(...other)

		return this.width == parsed.width && this.height == parsed.height
	}

	public copyFrom(...other: SizeLikeArguments): Size {
		const parsed = this.parseSizeLike(...other)

		this.width = parsed.width
		this.height = parsed.height

		return this
	}

	public set(
		...args: SizeLikeArguments | [(state: Size) => SizeLikeArguments]
	): Size {
		const parsed = this.parseSizeLike(...args)

		this.width = parsed.width
		this.height = parsed.height

		return this
	}

	public clone(): Size {
		return new Size(this.width, this.height)
	}
}
