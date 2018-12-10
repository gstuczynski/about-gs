const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const PROD = process.env.NODE_ENV === 'production';

const pathsToClean = ['dist'];

const cssLoader = (modulesEnabled = true) => ({
  loader: 'css-loader',
  options: {
    sourceMap: PROD,
    minimize: PROD,
    modules: modulesEnabled,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
  },
});

module.exports = {
  mode: PROD ? 'production' : 'development',
  output: {
    publicPath: PROD ? '' : '/',
    filename: PROD ? '[name].[chunkhash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|gif|jpg|svg|woff|woff2)$/,
        use: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: PROD
          ? [MiniCssExtractPlugin.loader, cssLoader(false)]
          : ['style-loader', cssLoader(false)],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: PROD ? [MiniCssExtractPlugin.loader, cssLoader()] : ['style-loader', cssLoader()],
      },
      {
        test: /\.module\.styl$/,
        use: PROD
          ? [MiniCssExtractPlugin.loader, cssLoader(), 'stylus-loader']
          : ['style-loader', cssLoader(), 'stylus-loader'],
      },
      {
        test: /\.styl$/,
        exclude: [/node_modules/, /\.module\.styl/],
        use: ['style-loader', cssLoader(false), 'stylus-loader'],
      },
      {
        test: /\.svg$/,
        include: /src\/assets\/icons/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  plugins: [
    new CleanWebpackPlugin(PROD ? pathsToClean : []),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: PROD ? '[name].[hash].css' : '[name].css',
    }),
  ],
};
