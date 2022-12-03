export class Clock {
	startTime: number
	lastFrameTime: number

	constructor() {
		this.startTime = Date.now()
		this.lastFrameTime = this.startTime
	}

	public getElapsedTime(): number {
		return Date.now() - this.startTime
	}

	public setDeltaTime(): void {
		this.lastFrameTime = Date.now()
	}

	public getDelta(): number {
		return Date.now() - this.lastFrameTime
	}
}
