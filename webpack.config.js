const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let plugins = [
	new MiniCssExtractPlugin({
		filename: 'main.css'
	}),
];

let conf = {
	plugins,
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist/'),
		filename: 'main.js',
		publicPath: 'dist/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							"@babel/plugin-transform-react-jsx",
							[ "@babel/plugin-proposal-decorators", { "legacy": true } ],
    						[ "@babel/plugin-proposal-class-properties", { "loose" : true } ]
						]
					}
				}
			},
			{
				test: /\.module\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
						importLoaders: 1,
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
                  		}
					},
				]
			},
			{
				test: /^((?!\.module).)*css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	devServer: {
		historyApiFallback: true,
		overlay: true,
		hot: true,
		open: true,
		port: 1337,
		proxy: {
			'/reactcourseapi/**': {
				target: 'http://faceprog.ru',
				secure: false,
				changeOrigin: true
			}
		}
	}
}

module.exports = conf;
