import { Position } from "@classes/Position"

import { Positionable } from "@typings/Positionable"

type CameraOpts = Partial<Positionable>

export class Camera implements CameraOpts {
	public position

	constructor(opts?: CameraOpts) {
		this.position = opts?.position ?? new Position()
	}
}
