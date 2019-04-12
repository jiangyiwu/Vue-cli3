module.exports = {
  publicPath: process.NOOD_ENV === 'production' ? '/helloWorld/' : '/',
  chainWebpack: config => {
    // console.log(config.module, '0-0-0-');
  },
  devServer: {
    port: 2333,
    host: 'localhost',
    disableHostCheck: false,
    open: true
  }
}