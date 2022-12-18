import { Circle, Position, Render, useFrame } from "gameengine"
import throttle from "lodash.throttle"
import { FC, useCallback, useMemo, useRef } from "react"

interface BirdData {
	velocity: Position
}

const birdStats = {
	startPosition: new Position(0, 200),
	startVelocity: new Position(3, 0),
	maxVelocity: 15,
	gravity: new Position(0, 0.5),
}

export const Bird: FC = () => {
	const bird = useRef(
		new Circle({
			radius: 10,
			color: "#4caf50",
			position: birdStats.startPosition.clone(),
		}),
	)

	const birdData = useRef<BirdData>({
		velocity: birdStats.startVelocity.clone(),
	})

	const reset = useCallback(() => {
		bird.current.position.copyFrom(birdStats.startPosition)
		birdData.current.velocity.copyFrom(birdStats.startVelocity)
	}, [])

	const flyUp = useMemo(
		() =>
			throttle(
				() => {
					birdData.current.velocity.y = -10
				},
				200,
				{ trailing: false },
			),
		[],
	)

	useFrame((scene) => {
		birdData.current.velocity.add(birdStats.gravity)
		bird.current.position.add(birdData.current.velocity)
		birdData.current.velocity.y = Math.min(
			birdData.current.velocity.y,
			birdStats.maxVelocity,
		)

		if (
			bird.current.position.y > scene.height ||
			bird.current.position.y < 0
		) {
			reset()
		}

		if (
			bird.current.isCollidingWith(
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
		scene.camera.position.x -= 300
	})

	return <Render object={bird} />
}
