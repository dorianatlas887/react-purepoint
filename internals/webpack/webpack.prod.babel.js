// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = require('./webpack.base.babel')({
  mode: 'production',
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/app.js')],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new WebpackPwaManifest({
      name: 'PurePoint',
      short_name: 'PurePoint',
      description: '',
      background_color: '#ffffff',
      theme_color: '#00bae4',
      icons: [
        {
          src: path.resolve('app/images/favicon.png'),
          sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192],
        },
      ],
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        ecma: 6,
      },
      cache: path.join(__dirname, 'webpack-cache/uglify-cache'),
    }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
