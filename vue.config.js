const path = require('path');
const glob = require('glob');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const PAGE_PATH = resolve('./src/pages');

const htmlPlugin = function() {
  const pages = {};
  const entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  entryHtml.forEach((path) => {
    const filename = path.substring(path.lastIndexOf('\/') + 1, path.lastIndexOf('.'))
    const config = {
      entry: path.replace(filename + '.html', filename + '.js'),
      filename: filename + '.html',
      template: path,
      chunks: ['chunk-vendors', 'chunk-common', filename]
    }
    pages[filename] = config;
  });
  return pages;
}

const pages = htmlPlugin();
console.log(pages, 'pages');

module.exports = {
  // chainWebpack: config => {
  //   console.log(config.module, '0-0-0-');
  // },
  publicPath: './',
  outputDir: 'dist',
  pages : pages,
  productionSourceMap: false,// 生产环境 sourceMap
  devServer: {
    port: 1900,
    host: 'localhost',
    disableHostCheck: false,
    open: false
  }
}