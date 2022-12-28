// @ts-check
const { join } = require("path")

/**
 * @type {import('next').NextConfig}
 **/

const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	sassOptions: {
		includePaths: [join(__dirname, "src", "styles")],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	output: "standalone",
	images: {
		unoptimized: true,
	},
	experimental: {
		appDir: true,
	},
}

module.exports = config
