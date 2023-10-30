const config = {
	mode: 'production',
	entry: {
		index: './src/js/index.js',
		favourite: './src/js/favourite.js',
		bag: './src/js/bag.js'
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;