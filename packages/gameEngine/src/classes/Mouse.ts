import { Camera } from "@classes/Camera"
import { Position } from "@classes/Position"

import { Positionable } from "@typings/optionable/Positionable"

export class Mouse implements Positionable {
	private camera: Camera

	public position = new Position()
	public button = 0

	private tempWorldPosition = new Position()
	get worldPosition(): Position {
		this.tempWorldPosition.copyFrom(this.position).add(this.camera.position)
		return this.tempWorldPosition
	}

	constructor(camera: Camera) {
		this.camera = camera
	}
}
