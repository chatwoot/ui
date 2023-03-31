const path = require('path');

module.exports = {
  publicPath: '/app/',
  outputDir: 'dist/app',
  pages: {
    index: {
      entry: 'src/packs/application.js'
      //FIXME
    },
    widget: {
      entry: 'src/packs/widget.js'
      //FIXME
    },
    'sdk-test': {
      entry: 'src/packs/sdk.js',
      custom: `
      <script>
        (function(d,t) {
          var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
          g.src="/app/js/sdk.js";
          s.parentNode.insertBefore(g,s);
          g.onload=function(){
            window.chatwootSDK.run({
              websiteToken: '${WEBSITE_INBOX_TOKEN}',
              baseUrl: ''
            })
          }
        })(document,"script");
      </script>
      `
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
        helpers: path.resolve('./src/shared/helpers'),
        'iconfont.eot': 'vue-easytable/libs/font/iconfont.eot',
        'iconfont.woff': 'vue-easytable/libs/font/iconfont.woff',
        'iconfont.ttf': 'vue-easytable/libs/font/iconfont.ttf',
        'iconfont.svg': 'vue-easytable/libs/font/iconfont.svg',
      },
      fallback: {
        'fs': false,
        'path': false,
      }
    },
    entry: {
      'sdk': './src/packs/sdk.js',
    },
    output: {
      filename: chunkData => chunkData.chunk.name === 'sdk' ? 'js/[name].js' : 'js/[name]-[hash].js',
    },
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.module
        .rule('file-loader')
        .test(/encoderWorker\.min\.js$/)
        .use('file-loader')
        .loader('file-loader')
  }
}
