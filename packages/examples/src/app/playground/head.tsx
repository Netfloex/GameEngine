import { NextSeo } from "next-seo"
import type { FC } from "react"

import { HeadTags } from "@components/HeadTags"

import SEO from "@seo-default"

const Head: FC = () => (
	<>
		<HeadTags />
		<NextSeo {...SEO} title="Playground" useAppDir />
	</>
)

export default Head
