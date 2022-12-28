import "@styles/global.scss"

import { FCC } from "gameengine/src/typings/FCC"

const RootLayout: FCC = ({ children }) => (
	<html lang="en">
		<body>{children}</body>
	</html>
)

export default RootLayout
