import { Camera } from "@ge/renderObjects/Camera"

import { Position } from "@ge/typings/Position"
import { Positionable } from "@ge/typings/Positionable"

export class Mouse implements Positionable {
	private camera: Camera

	public position: Position = { x: 0, y: 0 }
	public worldPosition: Position

	constructor(camera: Camera) {
		this.camera = camera

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const thisMouse = this
		this.worldPosition = {
			get x(): number {
				return thisMouse.position.x - thisMouse.camera.position.x
			},
			get y(): number {
				return thisMouse.position.y - thisMouse.camera.position.y
			},
		}
	}
}
