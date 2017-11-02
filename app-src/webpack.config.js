const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build
  include: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-uncompiled')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app
      plugins: ['react-native-web/babel'],
      // The 'react-native' preset is recommended (or use your own .babelrc)
      presets: ['react-native']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};


module.exports = env => {

  const removeEmpty = array => array.filter(p => !!p);

  var config = {
    entry: {
      app: path.resolve(__dirname, './src/'),
      vendor: ['react','react-dom','react-router', 'redux', 'react-redux', 'react-intl', 'redux-thunk']
    },
    // output tells webpack where to dump the files it have processed.
    // [name].[hash].js will output something like app.3531f6aad069a0e8dc0e.js
    output: {
      filename: '[name].[hash].js',
      path:  path.join(__dirname, './build/'),
      publicPath: '/' // want everything relative to root '/'
    },
    module: {
      rules: [
        babelLoaderConfiguration,
        imageLoaderConfiguration
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders:  ['react-hot-loader', 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react&cacheDirectory=true']
        }
      ]
    },
    plugins: removeEmpty([
      // used to split out our specified vendors script
      new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js'}),

      // HtmlWebpackPlugin will make sure our Javascript files are being called
      // from within our index.html
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV' : JSON.stringify('production')
      })
      ]),

      resolve: {
        // If you're working on a multi-platform React Native app, web-specific
        // module implementations should be written in files using the extension
        // `.web.js`.
        extensions: [ '.web.js', '.js' ],
        alias: {
          'react-native': path.resolve(__dirname, 'node_modules/react-native-web')
        }
      }
    };
    //c

  //export NODE_ENV=production
  // unset NODE_ENV
  if (process.env.NODE_ENV === 'production') {
    config.output.path = path.join(__dirname, 'dist/')
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }));
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }));
    config.plugins.push(new CopyWebpackPlugin([
            // {output}/file.txt
            //{ from: 'messages', to: 'messages' },
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/css',        to: 'css'},
            { from: 'src/assets',     to: 'assets' },
            { from: 'src/themes',     to: 'themes' },
            { from: 'src/locales',    to: 'locales'},
            { from: 'src/3rd-party',  to: '3rd-party'},
            { from: '.htaccess',      to: './'}
          ], {
              ignore: [
                  // Doesn't copy any files with a txt extension
                  '*.txt'
              ]
          }));
  }

  return config;
}
