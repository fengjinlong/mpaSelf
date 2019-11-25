const pluginName = 'htmlWebpackPluginBeforeHtmlProcessing';

class htmlWebpackPluginBeforeHtmlProcessing {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, pluginData => {
        let _html = pluginData.html
        let _jsArr = pluginData.assets.js
        console.log(pluginData);
        console.log(_html);
        let tagStr = ''
        _jsArr.forEach(ele => {
          let s = `<script src="${ele}"></script>`
          tagStr = tagStr + s
        })
        _html = _html.replace('<!-- injectjs -->', tagStr)
        pluginData.html = _html
      })
    });
  }
}

module.exports = htmlWebpackPluginBeforeHtmlProcessing