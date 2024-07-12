module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					browsers: ["ie >=11", "last 2 version", "> 5%", "not dead"],
				},
				modules: false,
			},
		],
		"@babel/preset-react",
	],
	plugins: [
		[
			"import",
			{ libraryName: "eui", libraryDirectory: "es/components", style: false },
		],
	],
};
