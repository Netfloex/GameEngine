import { CircleLike } from "@ge/typings/CircleLike"
import { RectangleLike } from "@ge/typings/RectangleLike"

export const circleRectangleCollision = (
	circle: CircleLike,
	rectangle: RectangleLike,
): boolean => {
	const circleStroke = (circle.strokeWidth ?? 0) / 2
	const rectangleStroke = (rectangle.strokeWidth ?? 0) / 2

	const circleComputedRadius = circle.radius + circleStroke
	return (
		circle.position.x + circleComputedRadius > rectangle.position.x &&
		circle.position.x - circleComputedRadius <
			rectangle.position.x + rectangle.size.width + rectangleStroke &&
		circle.position.y + circleComputedRadius > rectangle.position.y &&
		circle.position.y - circleComputedRadius <
			rectangle.position.y + rectangle.size.height + rectangleStroke
	)
}
