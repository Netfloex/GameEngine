import { CircleLike } from "@typings/CircleLike"
import { RectangleLike } from "@typings/RectangleLike"

export const circleRectangleCollision = (
	circle: CircleLike,
	rectangle: RectangleLike,
): boolean => {
	const circleStroke = (circle.strokeWidth ?? 0) / 2
	const rectangleStroke = (rectangle.strokeWidth ?? 0) / 2

	const rectangleWidth = rectangle.size.width / 2 + rectangleStroke
	const rectangleHeight = rectangle.size.height / 2 + rectangleStroke

	const circleComputedRadius = circle.radius + circleStroke

	return (
		circle.position.x + circleComputedRadius >
			rectangle.position.x - rectangleWidth &&
		circle.position.x - circleComputedRadius <
			rectangle.position.x + rectangleWidth &&
		circle.position.y + circleComputedRadius >
			rectangle.position.y - rectangleHeight &&
		circle.position.y - circleComputedRadius <
			rectangle.position.y + rectangleHeight
	)
}
