import { SizeArray, SizeObject } from "@typings/optionable/Sizable"

type SizeLikeArguments = SizeArray | [SizeObject] | []

export class Size {
	width = 0
	height = 0

	constructor(...args: SizeLikeArguments) {
		this.set(...args)
	}

	public equals(other: Size): boolean {
		return this.width == other.width && this.height == other.height
	}

	public copyFrom(other: Size): Size {
		this.width = other.width
		this.height = other.height

		return this
	}

	public set(
		...args: SizeLikeArguments | [(state: Size) => SizeLikeArguments]
	): Size {
		if (args.length == 2) {
			this.width = args[0]
			this.height = args[1]
		} else if (args.length == 1 && typeof args[0] == "object") {
			this.width = args[0].width
			this.height = args[0].height
		} else if (args.length == 1 && typeof args[0] == "function") {
			const data = args[0](this)
			this.set(...data)
		}

		return this
	}

	public clone(): Size {
		return new Size(this.width, this.height)
	}
}
