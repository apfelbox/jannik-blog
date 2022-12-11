import pino from "pino";

const isDev = "production" !== process.env.NODE_ENV;

export const logger = pino({
	base: null,
	level: isDev ? "debug" : "info",
	transport: {
		target: isDev ? 'pino-pretty' : "pino/file",
		options: {
			colorize: true,
			destination: 2,
		},
	},
});
