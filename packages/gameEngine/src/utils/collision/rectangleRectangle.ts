import { RectangleLike } from "@typings/RectangleLike"

export const rectangleRectangleCollision = (
	rectangle: RectangleLike,
	other: RectangleLike,
): boolean => {
	const rectangleStroke = rectangle.strokeWidth ?? 0 / 2
	const otherStroke = other.strokeWidth ?? 0 / 2

	const rectangleHeight = rectangle.size.height / 2 + rectangleStroke
	const rectangleWidth = rectangle.size.width / 2 + rectangleStroke

	const otherHeight = other.size.height / 2 + otherStroke
	const otherWidth = other.size.width / 2 + otherStroke

	return (
		other.position.x + otherWidth > rectangle.position.x - rectangleWidth &&
		other.position.x - otherWidth < rectangle.position.x + rectangleWidth &&
		other.position.y + otherHeight >
			rectangle.position.y - rectangleHeight &&
		other.position.y - otherHeight < rectangle.position.y + rectangleHeight
	)
}
