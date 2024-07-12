/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:23:11
 * @Description:
 */
const paths = require("./paths");
const { merge } = require("webpack-merge");
const isProd = ["prod"].includes(process.env.BUILD_ENV);
const configName = `./webpack.${isProd ? "prod" : "dev"}.js`;
const webpackExtension_Config = require(`./${configName}`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const webpackConfig = {
	entry: paths.appIndexJs,
	output: {
		path: paths.appBuild,
		filename: "[name].js",
		publicPath: "http://127.0.0.1:8080/build/",
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
						},
					},
				],
			},
			{
				test: /\.(c|le)ss?$/,
				include: [paths.appSrc],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
						},
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[local]_[contenthash:8]",
							},
						},
					},
					"less-loader",
				],
			},
			{
				test: /\.(c|le)ss?$/,
				exclude: [paths.appSrc],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
					},
					"less-loader",
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
		}),
		new ModuleFederationPlugin({
			name: "app3", // 应用名称 唯一
			// library: { type: "var", name: "app3" },
			filename: "remoteEntry.js",
			// 导出组件
			exposes: {
				"./BtnEsReactRender": "./src/components/BtnEsReactRender",
				"./BtnEs": "./src/components/BtnEs",
			},
			shared: {
				react: {
					singleton: true,
					// eager: true,
				},
				"react-dom": {
					singleton: true,
					// eager: true,
				},
			},
		}),
	],
	resolve: {
		alias: {
			react: "preact/compat",
			"react-dom/test-utils": "preact/test-utils",
			"react-dom": "preact/compat", // Must be below test-utils
			"react/jsx-runtime": "preact/jsx-runtime",
		},
	},
};

module.exports = merge(
	webpackConfig,
	webpackExtension_Config({
		...process.env,
	}),
);
