/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	webpack (config)
	{
		config.module.rules.push({
			test: /\.svg$/,
			loader: "raw-loader",
		});

		return config;
	},
};
