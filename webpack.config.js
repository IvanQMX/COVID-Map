const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'src', 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: [
                    'style-loader',
                    'css-loader'
                ],
                test: /\.css$/
            },
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    }
};