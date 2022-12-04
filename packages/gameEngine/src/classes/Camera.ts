import { Position } from "@classes/Position"
import { Scene } from "@classes/Scene"
import { Rectangle } from "@renderObjects/Rectangle"

import { Positionable } from "@typings/optionable/Positionable"

type CameraOpts = Partial<Positionable>

export class Camera implements CameraOpts {
	public position

	private visibleRectangle = new Rectangle()

	private halfSizeOffset = new Position()

	public getVisibleRectangle(scene: Scene): Rectangle {
		this.halfSizeOffset.x = scene.width / 2
		this.halfSizeOffset.y = scene.height / 2

		this.visibleRectangle.position
			.copyFrom(this.position)
			.add(this.halfSizeOffset)

		this.visibleRectangle.size.width = scene.width
		this.visibleRectangle.size.height = scene.height

		return this.visibleRectangle
	}

	constructor(opts?: CameraOpts) {
		this.position = opts?.position ?? new Position()
	}
}
