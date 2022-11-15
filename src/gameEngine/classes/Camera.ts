import { Position } from "@ge/classes/Position"

import { Positionable } from "@ge/typings/Positionable"

type CameraOpts = Partial<Positionable>

export class Camera implements CameraOpts {
	public position

	constructor(opts?: CameraOpts) {
		this.position = opts?.position ?? new Position()
	}
}
