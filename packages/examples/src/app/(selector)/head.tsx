import { NextSeo } from "next-seo"
import type { FC } from "react"

import SEO from "@seo-default"

const Head: FC = () => <NextSeo {...SEO} title="Selector" useAppDir />

export default Head
