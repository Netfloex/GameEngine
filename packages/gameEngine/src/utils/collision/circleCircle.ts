import { CircleLike } from "@typings/CircleLike"

export const circleCircleCollision = (
	circle: CircleLike,
	other: CircleLike,
): boolean => {
	const circleComputedRadius = circle.radius + (circle.strokeWidth ?? 0) / 2
	const otherComputedRadius = other.radius + (other.strokeWidth ?? 0) / 2

	return (
		circle.position.squaredDistanceTo(other.position) <
		Math.pow(circleComputedRadius + otherComputedRadius, 2)
	)
}
