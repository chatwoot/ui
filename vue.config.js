const path = require('path');

module.exports = {
  publicPath: '/app/',
  pages: {
    index: {
      entry: 'src/packs/application.js'
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue$: 'vue/dist/vue.common.js',
        dashboard: path.resolve('./src/dashboard'),
        shared: path.resolve('./src/shared'),
        widget: path.resolve('./src/widget'),
        assets: path.resolve('./src/dashboard/assets'),
        components: path.resolve('./src/dashboard/components'),
        './iconfont.eot': 'vue-easytable/libs/font/iconfont.eot',
        './iconfont.woff': 'vue-easytable/libs/font/iconfont.woff',
        './iconfont.ttf': 'vue-easytable/libs/font/iconfont.ttf',
        './iconfont.svg': 'vue-easytable/libs/font/iconfont.svg',
      },
    },
  },
}
