const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
    entry: {
        'main': './src/js/script.js',
        'style': './src/sass/style.scss'
    },
    resolve: {
        modules: ['node_modules', 'bower_components'],
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.scss']
    },
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, 'static'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader!eslint-loader',
                exclude: ['/node_modules/']
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!resolve-url-loader!sass-loader?sourceMap=true'})
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=./img/[name].[ext].'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.tether': 'tether',
            'window.Tether': 'tether',
            'Tether': 'tether',
            'Popper': 'popper.js',
            'window.Popper': 'popper.js'
        }),
         new webpack.optimize.UglifyJsPlugin()
    ]
}];
