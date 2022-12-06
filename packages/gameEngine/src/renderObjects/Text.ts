import { Camera } from "@classes/Camera"
import { RenderObject } from "@classes/RenderObject"
import { Rectangle } from "@renderObjects/Rectangle"

import { circleRectangleCollision } from "@utils/collision/circleRectangle"
import { rectangleRectangleCollision } from "@utils/collision/rectangleRectangle"

import { RenderObjectType } from "@typings/RenderObjectType"
import { RenderObjects } from "@typings/RenderObjects"
import { StandardOptions } from "@typings/StandardOptions"
import { Colorable } from "@typings/optionable/Colorable"
import { OptionalArray } from "@typings/utils/OptionalArray"

export interface TextOpts extends StandardOptions, Colorable {
	text: string | number
	fontFamily?: string
	fontSize?: number
	fontSizeUnit?: string
}

export class Text extends RenderObject implements RenderObjectType {
	public type = "text" as const
	public text
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
	}

	public getWidth(): number {
		this.setTextSettings(this.tempCtx)
		return this.tempCtx.measureText(this.text.toString()).width
	}

	public getHeight(): number {
		return this.fontSize
	}

	public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
		this.prepareRender(ctx, camera, () => {
			this.setTextSettings(ctx)
			ctx.fillText(this.text.toString(), 0, 0)
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
		this.color = opts.color ?? "white"
		this.fontFamily = opts.fontFamily ?? "sans-serif"
		this.fontSize = opts.fontSize ?? 10
		this.fontSizeUnit = opts.fontSizeUnit ?? "px"
	}
}