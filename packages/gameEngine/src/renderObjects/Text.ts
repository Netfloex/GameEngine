import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"
import { Rectangle } from "@renderObjects/Rectangle"

import { circleRectangleCollision } from "@utils/collision/circleRectangle"
import { rectangleRectangleCollision } from "@utils/collision/rectangleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { Colorable } from "@typings/optionable/Colorable"
import { Strokable } from "@typings/optionable/Strokable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface TextOpts extends StandardOptions, Colorable, Strokable {
	text: string | number
	maxWidth?: number
	fontFamily?: string
	fontSize?: number
	fontSizeUnit?: string
}

export class Text extends RenderObject implements RenderObjectType {
	public type = "text" as const
	public text
	public maxWidth
	public fontFamily
	public fontSize
	public fontSizeUnit

	private boundingBoxRectangle = new Rectangle({ alpha: 0.5 })
	private tempCtx = document.createElement("canvas").getContext("2d")!

	public getBoundingBoxRectangle(): Rectangle {
		this.boundingBoxRectangle.position.copyFrom(this.position)

		this.boundingBoxRectangle.size.width = this.getWidth()
		this.boundingBoxRectangle.size.height = this.getHeight()

		this.boundingBoxRectangle.position.x += this.getWidth() / 2
		this.boundingBoxRectangle.position.y += this.getHeight() / 2

		return this.boundingBoxRectangle
	}

	private getFont(): string {
		return `${this.fontSize + this.fontSizeUnit} ${this.fontFamily}`
	}

	private setTextSettings(ctx: CanvasRenderingContext2D): void {
		ctx.font = this.getFont()
		ctx.textAlign = "left"
		ctx.textBaseline = "top"
		ctx.fillStyle = this.color
		ctx.strokeStyle = this.color
		ctx.lineWidth = this.strokeWidth
	}

	public getWidth(): number {
		this.setTextSettings(this.tempCtx)

		// The width is the lowest number of the maxWidth and the render width
		const params = [
			this.tempCtx.measureText(this.text.toString()).width,
			this.maxWidth,
		].filter((i): i is number => i !== undefined)

		// The width should be at least 0
		return Math.max(Math.min(...params), 0)
	}

	public getHeight(): number {
		return this.fontSize
	}

	public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		this.prepareRender(ctx, camera, () => {
			this.setTextSettings(ctx)
			const renderText = this.stroke
				? ctx.strokeText.bind(ctx)
				: ctx.fillText.bind(ctx)

			renderText(this.text.toString(), 0, 0, this.maxWidth)
		})
	}

	public isCollidingWith(others: OptionalArray<RenderObjects>): boolean {
		return [others].flat().some((other) => {
			switch (other.type) {
				case "rectangle":
				case "picture":
					return rectangleRectangleCollision(
						other,
						this.getBoundingBoxRectangle(),
					)
				case "circle":
					return circleRectangleCollision(
						other,
						this.getBoundingBoxRectangle(),
					)
				case "text":
					return rectangleRectangleCollision(
						other.getBoundingBoxRectangle(),
						this.getBoundingBoxRectangle(),
					)
			}
		})
	}

	constructor(opts: TextOpts) {
		super(opts)

		this.text = opts.text
		this.maxWidth = opts.maxWidth
		this.color = opts.color ?? "white"
		this.fontFamily = opts.fontFamily ?? "sans-serif"
		this.fontSize = opts.fontSize ?? 10
		this.fontSizeUnit = opts.fontSizeUnit ?? "px"
		this.stroke = opts.stroke
		this.strokeWidth = opts.strokeWidth ?? 1
	}
}
