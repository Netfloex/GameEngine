import { Position } from "@classes/Position"

import { CircleLike } from "@typings/CircleLike"
import { RectangleLike } from "@typings/RectangleLike"

const tempRotatedPosition = new Position()

export const circleRectangleCollision = (
	circle: CircleLike,
	rectangle: RectangleLike,
): boolean => {
	const circleStroke = (circle.strokeWidth ?? 0) / 2
	const rectangleStroke = (rectangle.strokeWidth ?? 0) / 2

	const rectangleWidth = rectangle.size.width / 2 + rectangleStroke
	const rectangleHeight = rectangle.size.height / 2 + rectangleStroke

	const circleComputedRadius = circle.radius + circleStroke

	const cos = Math.cos(rectangle.rotation)
	const sin = Math.sin(rectangle.rotation)

	tempRotatedPosition
		.copyFrom(circle.position)
		.subtract(rectangle.position)
		.set((pos) => [pos.x * cos + pos.y * sin, pos.x * sin - pos.y * cos])

	tempRotatedPosition.add(rectangle.position)

	return (
		tempRotatedPosition.x + circleComputedRadius >
			rectangle.position.x - rectangleWidth &&
		tempRotatedPosition.x - circleComputedRadius <
			rectangle.position.x + rectangleWidth &&
		tempRotatedPosition.y + circleComputedRadius >
			rectangle.position.y - rectangleHeight &&
		tempRotatedPosition.y - circleComputedRadius <
			rectangle.position.y + rectangleHeight
	)
}
