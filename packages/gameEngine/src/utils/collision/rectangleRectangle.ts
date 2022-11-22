import { Rectangle } from "@renderObjects/Rectangle"

export const rectangleRectangleCollision = (
	rectangle: Rectangle,
	other: Rectangle,
): boolean => {
	const rectangleStroke = rectangle.strokeWidth / 2
	const otherStroke = other.strokeWidth / 2

	const rectangleHeight = rectangle.size.height + rectangleStroke
	const rectangleWidth = rectangle.size.width + rectangleStroke
	const otherHeight = other.size.height + otherStroke
	const otherWidth = other.size.width + otherStroke

	return (
		other.position.x + otherWidth > rectangle.position.x &&
		other.position.x - otherWidth < rectangle.position.x + rectangleWidth &&
		other.position.y + otherHeight > rectangle.position.y &&
		other.position.y - otherHeight < rectangle.position.y + rectangleHeight
	)
}
