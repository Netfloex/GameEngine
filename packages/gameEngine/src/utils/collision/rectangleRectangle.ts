import { Rectangle } from "@renderObjects/Rectangle"

export const rectangleRectangleCollision = (
	rectangle: Rectangle,
	other: Rectangle,
): boolean => {
	const rectangleStroke = rectangle.strokeWidth / 2
	const otherStroke = other.strokeWidth / 2

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
