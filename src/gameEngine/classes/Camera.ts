import { Positionable } from "@ge/typings/Positionable"

type CameraOpts = Positionable

export class Camera implements CameraOpts {
	public position

	constructor(opts: CameraOpts) {
		this.position = opts.position
	}
}
