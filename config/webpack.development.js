/* eslint-disable no-undef */
const CopyPlugin = require('copy-webpack-plugin')
const {
  join,
  resolve
} = require("path")
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
console.log('webdev')
module.exports = {
  // publicPath: "/" 将dist的../../改为/
  output: {
    filename: 'scripts/[name].bundle.js',
    publicPath: "/"
  },
  plugins: [
    // new WebpackBuildNotifierPlugin({
    //   title: "🦁️ SSR Webpack Build",
    //   logo: resolve("./xigua.png"),
    //   suppressSuccess: true
    // }),
    new CopyPlugin([{
      from: join(__dirname, "../", "src/web/pages/layout/layout.html"),
      to: "../views/layout/layout.html"
    }, ]),
    new CopyPlugin([{
      from: join(__dirname, "../", "src/web/components"),
      to: '../components'
    }, ], {
      ignore: ["*.js", "*.css", ".DS_Store"],
      copyUnmodified: true
    })
  ]
}