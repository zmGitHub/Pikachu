import Webpack from 'webpack';
import fs from 'fs';
import config from './config';

const paths = config.utils_paths;

const APP_ENTRY = [
  'koa',
  'koa-static',
  'koa-convert',
  'mockjs',
  'path-to-regexp',
  paths.mock('index.js'),
];


const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x =>
     ['.bin'].indexOf(x) === -1
  )
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const deployConfig = {
  name: 'server',
  target: 'node',
  entry: APP_ENTRY,
  output: {
    path: paths.build(),
    filename: 'server.js',
    publicPath: config.public_path,
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: (path) => {
        const isNpmModule = !!path.match(/node_modules/);
        return isNpmModule;
      },
      loader: 'babel',
    }],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new Webpack.optimize.DedupePlugin(), // 去除重复文件
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
  ],
  externals: nodeModules,
};

export default deployConfig;
