export const fillOrStroke = (
	ctx: CanvasRenderingContext2D,
	stroke: boolean | undefined,
): {
	(fillRule?: CanvasFillRule | undefined): void
	(path: Path2D, fillRule?: CanvasFillRule | undefined): void
} => {
	return stroke ? ctx.stroke.bind(ctx) : ctx.fill.bind(ctx)
}
