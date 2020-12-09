const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7105;
const dev = process.env.NODE_ENV === 'development'
module.exports = {
  publicPath: dev ? `//localhost:${port}` : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    }
  },
  chainWebpack:config => {
    config   
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('eval-source-map')
      )
      .end()
      config.output
      .library(`${name}-[name]`)
      .libraryTarget('umd')
      .jsonpFunction(`webpackJsonp_${name}`)
  }
};
