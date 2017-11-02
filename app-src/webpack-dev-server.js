// *********
// Webpack Dev Server
// This file is used to run our local environment in development mode.  Production
// build does not go through dev server

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const path = require('path');


const env = { dev: process.env.NODE_ENV}

const devServerConfig = {
  contentBase: path.join(__dirname, './src/'),
  hot: true,
  historyApiFallback: { disableDotRule: true }, // need historyApiFallback to be able to refresh on dynamic route
  stats: { colors: true} // Pretty colors on console
};

const server = new WebpackDevServer(webpack(webpackConfig(env)), devServerConfig);

// server will be live at http://localhost:8081
server.listen(8081, 'localhost');
