const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (config) => ({
	mode: "production", // production
	devtool: false,
	plugins: [new CleanWebpackPlugin()],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					keep_classnames: true,
					keep_fnames: true,
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},
			}),

			new CssMinimizerPlugin({
				parallel: true,
			}),
		].filter(Boolean),
		splitChunks: {
			chunks: "all", // 异步加载代码块， all
			minSize: 0,
			maxSize: 1024 * 10, // 2mb
			// cacheGroups: {
			// 	commons: {
			// 		name: "commons",
			// 		minChunks: 2,
			// 		priority: 0,
			// 	},
			// },
		},
		// runtimeChunk: {
		//   name: (entrypoint) => `runtime-${entrypoint.name}`,
		// },
	},
});
