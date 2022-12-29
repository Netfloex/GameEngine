import {
	Circle,
	Picture,
	Position,
	Render,
	useFrame,
	useScene,
} from "gameengine"
import throttle from "lodash.throttle"
import {
	FC,
	MutableRefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react"

interface BirdData {
	velocity: Position
}

const birdStats = {
	startPosition: new Position(0, 200),
	startVelocity: new Position(4, 0),
	maxVelocity: 15,
	gravity: new Position(0, 0.7),
	jumpVelocityY: -13,
	xOffset: 300,
	size: 60,
}

export const Bird: FC<{
	scoreRef: MutableRefObject<number>
	obstacleDistance: number
}> = ({ scoreRef, obstacleDistance }) => {
	const scene = useScene()

	const bird = useRef(
		new Picture({
			src: "/flappy/bird.png",
			position: birdStats.startPosition.clone(),
		}),
	)
	const birdHitbox = useRef(
		new Circle({
			radius: birdStats.size / 2,
			position: bird.current.position,
		}),
	)

	const birdData = useRef<BirdData>({
		velocity: birdStats.startVelocity.clone(),
	})

	const tempVelocity = useMemo(() => new Position(), [])

	const reset = useCallback(() => {
		bird.current.position.copyFrom(birdStats.startPosition)
		birdData.current.velocity.copyFrom(birdStats.startVelocity)
		scoreRef.current = 0
	}, [scoreRef])

	useEffect(() => {
		birdStats.xOffset = scene.width / 10
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const flyUp = useMemo(
		() =>
			throttle(
				() => {
					birdData.current.velocity.y = birdStats.jumpVelocityY
				},
				200,
				{ trailing: false },
			),
		[],
	)

	useFrame(
		useCallback(
			(scene) => {
				const aspectRatio =
					bird.current.image.width / bird.current.image.height

				bird.current.size.set(
					birdStats.size * aspectRatio,
					birdStats.size,
				)

				const deltaTime = scene.clock.getDelta() * (60 / 1000)

				birdData.current.velocity.add(
					tempVelocity.copyFrom(birdStats.gravity).scale(deltaTime),
				)

				bird.current.position.add(
					tempVelocity
						.copyFrom(birdData.current.velocity)
						.scale(deltaTime),
				)

				birdData.current.velocity.y = Math.min(
					birdData.current.velocity.y,
					birdStats.maxVelocity,
				)

				bird.current.rotation = birdData.current.velocity.y / 40

				if (
					bird.current.position.y > scene.height ||
					bird.current.position.y < 0
				) {
					reset()
				}

				if (
					birdHitbox.current.isCollidingWith(
						scene.objects.filter(({ name }) => name == "obstacle"),
					)
				) {
					reset()
				}

				if (scene.keyboard[" "] || scene.mouse.button) {
					flyUp()
				}

				scene.camera.position.copyFrom(bird.current.position)
				scene.camera.position.y = 0
				scene.camera.position.x -= birdStats.xOffset
				scoreRef.current = Math.floor(
					bird.current.position.x / obstacleDistance,
				)
			},
			[flyUp, obstacleDistance, reset, scoreRef, tempVelocity],
		),
	)

	return (
		<>
			<Render object={bird} />
			{/* <Render object={birdHitbox} /> */}
		</>
	)
}
