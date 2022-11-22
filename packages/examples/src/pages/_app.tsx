import "@styles/global.scss"

import { DefaultSeo } from "next-seo"
import { AppType } from "next/app"

import SEO from "@seo-default"

const App: AppType = ({ Component, pageProps }) => (
	<>
		<DefaultSeo {...SEO} />
		<Component {...pageProps} />
	</>
)

export default App
