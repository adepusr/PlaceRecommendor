var webpack = require('webpack');
var serverCfg = require('./serverCfg.json');
module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
	entry: {
        mainPage: "./src/js/mainPageEntry.jsx",
	},
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
            }
        }]
    },
    output: {
        path: __dirname + "/public/js",
        publicPath: '/js/',
        filename: "[name].min.js"
    },
	plugins: [
        new webpack.optimize.UglifyJsPlugin(
        {
        compressor: {
        warnings: false
        }
        }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
}