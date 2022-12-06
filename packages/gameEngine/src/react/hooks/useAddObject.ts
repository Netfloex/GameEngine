import { MutableRefObject, useEffect } from "react"

import { useScene } from "@hooks/useScene"

import { RenderObjects } from "@typings/RenderObjects"
import { OptionalArray } from "@typings/utils/OptionalArray"

type OptionalFunction<T> = T | (() => T)

export const useAddObject = <
	T extends MutableRefObject<OptionalFunction<OptionalArray<RenderObjects>>>,
>(
	objectsGenerator: T,
): T => {
	const scene = useScene()

	useEffect(() => {
		const objects =
			typeof objectsGenerator.current == "function"
				? objectsGenerator.current()
				: objectsGenerator.current

		scene.add(...[objects].flat())

		return () => {
			scene.remove(...[objects].flat())
		}
	}, [objectsGenerator, scene])

	return objectsGenerator
}
