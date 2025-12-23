// vue.config.js
const path = require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/',
  indexPath: 'index.html',
  outputDir: process.env.outputDir || 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: !IS_PROD,
  parallel: require("os").cpus().length > 1,
  pwa: {},
  chainWebpack: config => {
    config.resolve.symlinks(true);
    config.plugin("html").tap(args => {
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'));
  },
  devServer: {
    client: {
      overlay: false
    },
    host: "localhost",
    port: 8080,
    https: false,
    open: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
};