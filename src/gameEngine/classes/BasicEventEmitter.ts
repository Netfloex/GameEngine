export class BasicEventEmitter<
	EventListeners extends {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[eventName: string]: Array<(...args: any[]) => any>
	},
> {
	private eventListeners: EventListeners = {} as EventListeners

	public emit<T extends keyof EventListeners>(
		eventName: T,
		...data: Parameters<EventListeners[T][0]>
	): void {
		// eslint-disable-next-line prefer-spread
		this.eventListeners[eventName]?.forEach((cb) => cb.apply(null, data))
	}

	public on<T extends keyof EventListeners>(
		eventName: T,
		listener: EventListeners[T][0],
	): void {
		this.eventListeners[eventName] ??= [] as unknown as EventListeners[T]

		this.eventListeners[eventName].push(listener)
	}

	public off<T extends keyof EventListeners>(
		eventName: T,
		listener: EventListeners[T][0],
	): void {
		const index = this.eventListeners[eventName].indexOf(listener)

		if (index > -1) this.eventListeners[eventName].splice(index, 1)
	}
}
