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

const projectname = process.argv[3]; // 获取执行哪个文件
let page = {};
if (process.env.NODE_ENV == 'development') {
  page = pages
} else {
  page[projectname] = pages[projectname]
}

module.exports = {
  // chainWebpack: config => {
  //   console.log(config.module, '0-0-0-');
  // },
  publicPath: './',
  outputDir: 'dist' + projectname,
  pages : page,
  productionSourceMap: false,// 生产环境 sourceMap
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/pages/index/assets/style/main.scss',
        })
        .end()
    })
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
  },
  devServer: {
    port: 1900,
    host: 'localhost',
    disableHostCheck: false,
    open: false
  }
}