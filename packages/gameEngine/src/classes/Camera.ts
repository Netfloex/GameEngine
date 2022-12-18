import { Position } from "@classes/Position"
import { Scene } from "@classes/Scene"
import { Rectangle } from "@renderObjects/Rectangle"

import { Positionable } from "@typings/optionable/Positionable"

type CameraOpts = Partial<Positionable>

export class Camera implements CameraOpts {
	public position

	private visibleRectangle = new Rectangle()

	public getVisibleRectangle(scene: Scene): Rectangle {
		this.visibleRectangle.position
			.copyFrom(this.position)
			.add(scene.width / 2, scene.height / 2)

		this.visibleRectangle.size.copyFrom(scene)

		return this.visibleRectangle
	}

	constructor(opts?: CameraOpts) {
		this.position = opts?.position ?? new Position()
	}
}
