var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: '../server/build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      // precompile es6
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?cacheDirectory&stage=1'] },

      // require('.scss')
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!sass?sourceMap') },

      // css stuff
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css') },

      // for React dev tools, but also for React.createElement
      { test: require.resolve('react'), loader: 'expose?React' },

      // the file loader works its magic
      // https://github.com/webpack/file-loader#usage
      { test: /\.(png|jpg)$/, loader: 'url?limit=10000' },

      // fonts
      // try to put the font in a url(....) mess unless it's bigger than 10k
      // otherwise, the file-loader will then copy paste this to the output directory
      { test: /\.woff2?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ],
  },

  plugins: [
    // prevent fouc (flash of unstyled content)
    new ExtractTextPlugin('bundle.css'),

    // copy index.html and inject the bundle.css and bundle.js into them
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),

    // get fetch in the browser with webpack
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  devtool: 'eval-source-map',

  devServer: {
    contentBase: './app',
    inline: true,
    colors: true
  }
};
