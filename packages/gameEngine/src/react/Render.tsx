import { FC } from "react"

import { useAddObject } from "@hooks/useAddObject"

export const Render: FC<{
	object: Parameters<typeof useAddObject>[0]
}> = ({ object }) => {
	useAddObject(object)

	return null
}
