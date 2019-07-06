module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
