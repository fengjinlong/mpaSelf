/* eslint-disable no-undef */
// 取model
const argv = require("yargs-parser")(process.argv.slice(2))
const _mode = argv.mode || "development"
const _modeFlag = _mode == "development" ? true : false
console.log(_mode)
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const merge = require("webpack-merge")

const HtmlWebpackPlugin = require("html-webpack-plugin")

const glob = require("glob")

const {
  join,
  resolve
} = require("path")

// 插件
const htmlWebpackPluginBeforeHtmlProcessing = require("./config/htmlAfterPlugin")

// 入口文件
let _entry = {}
// 多个html
let _plugins = [
  // new HtmlWebpackPlugin({
  //   filename: 'test.html',
  //   template: 'src/web/pages/list.html'
  // })
]


// 寻找全部的entry win不认识** 😄
const files = glob.sync("./src/web/pages/**/*.entry.js")
for (let item of files) {
  // './src/web/pages/home/home.entry.js',
  // console.log(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true)
  // 由于正则有问题，下面暂时用截取字符串方式拿文件名
  // if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\/[a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
  if (true) {
    // const entryKey = RegExp.$1
    let ln = item.lastIndexOf('/')
    let ln2 = item.indexOf('.', ln)
    let temName = item.substring(ln + 1, ln2)
    // const [dist, template] = entryKey.split("-")
    // _entry[entryKey] = item
    _entry[temName] = item
    _plugins.push(new HtmlWebpackPlugin({
      filename: `../views/${temName}/${temName}.html`,
      template: `src/web/pages/${temName}/${temName}.html`,
      // 不自动插入所有js,通过插件插入自己需要的js
      inject: false,
      // 只要公共js和自己js
      chunks: [
        "runtime",
        temName
      ]
    }))
  }
}
// console.log('_plugins')
// console.log(_plugins)

const webpackConfig = {
  entry: _entry,
  watch: _modeFlag,
  output: {
    path: join(__dirname, "./dist/assets")
  },
  resolve: {
    alias: {
      // "@components": resolve(__dirname, 'src/web/components')
    }
  },
  module: {
    rules: [{
      test: /\.css$/i,
      // loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][local]--[hash:base64:5]',
            },
          },
        }
      ]
    }]
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [
    ..._plugins,
    new htmlWebpackPluginBeforeHtmlProcessing
  ]
}
module.exports = merge(webpackConfig, _mergeConfig)