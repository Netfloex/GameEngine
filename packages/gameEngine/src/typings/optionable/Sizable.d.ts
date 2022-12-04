import { Size } from "@classes/Size"

export interface Sizable {
	size: Size
}

export interface SizeObject {
	width: number
	height: number
}

export type SizeArray = [width: number, height: number]

export type SizeLike = Size | SizeArray | SizeObject

export interface SizeableLike {
	size?: SizeLike
}
