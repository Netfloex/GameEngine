import { MutableRefObject, useEffect } from "react"

import { useScene } from "@hooks/useScene"

import { RenderObjects } from "@typings/RenderObjects"

type OptionalArray<T> = T[] | T

export const useAddObject = <
	T extends
		| MutableRefObject<OptionalArray<RenderObjects>>
		| (() => OptionalArray<RenderObjects>),
>(
	objectsGenerator: T,
): T => {
	const scene = useScene()

	useEffect(() => {
		const objects =
			typeof objectsGenerator == "function"
				? objectsGenerator()
				: objectsGenerator.current

		scene.add(...[objects].flat())
	}, [objectsGenerator, scene])

	return objectsGenerator
}
