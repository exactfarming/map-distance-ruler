const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    devtool: 'none',
    entry: {
      'dist/build': './lib/app.js'
    },
    output: {
      path: path.join(__dirname, ''),
      filename: '[name].js'
    },
    plugins: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      }),
      new CopyWebpackPlugin([
        { from: 'lib/app.css', to: 'dist' }
      ]),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components|vendor)/
        }
      ]
    }
  };
};
