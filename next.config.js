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

	output: "standalone",
}

module.exports = config
