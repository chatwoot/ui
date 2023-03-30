const path = require('path');
const { API_HOST, WEBSOCKET_URL, HOST_URL, WEBSITE_INBOX_TOKEN } = process.env

module.exports = {
  publicPath: '/app/',
  outputDir: 'dist/app',
  pages: {
    index: {
      entry: 'src/packs/application.js',
      custom: `
        <script>
          window.chatwootConfig = {
            hostURL: '${HOST_URL}',
            fbAppId: '',
            signupEnabled: 'true',
            enabledLanguages: [
              {
                "name":"English (en)",
                "iso_639_1_code":"en"
              }
            ],
            selectedLocale: 'en',
            apiHost: '${API_HOST}',
            websocketURL: '${WEBSOCKET_URL}'
          }
          window.globalConfig = {
            "LOGO":"https://app.chatwoot.com/brand-assets/logo.svg",
            "LOGO_THUMBNAIL":"https://app.chatwoot.com/brand-assets/logo_thumbnail.svg",
            "INSTALLATION_NAME":"Chatwoot",
            "WIDGET_BRAND_URL":"https://www.chatwoot.com",
            "TERMS_URL":"https://www.chatwoot.com/terms-of-service",
            "PRIVACY_URL":"https://www.chatwoot.com/privacy-policy",
            "APP_VERSION":"1.16.2"
          }
        </script>
      `
    },
    widget: {
      entry: 'src/packs/widget.js',
      custom: `
        <script>
        window.chatwootConfig = {
          apiHost: '${API_HOST}',
          websocketURL: '${WEBSOCKET_URL}'
        };
        </script>
      `
    },
    // 'sdk-test': {
    //   entry: 'src/packs/sdk-test.js',
    //   custom: `
    //   <script>
    //     (function(d,t) {
    //       var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    //       g.src="/app/js/sdk.js";
    //       s.parentNode.insertBefore(g,s);
    //       g.onload=function(){
    //         window.chatwootSDK.run({
    //           websiteToken: '${WEBSITE_INBOX_TOKEN}',
    //           baseUrl: ''
    //         })
    //       }
    //     })(document,"script");
    //   </script>
    //   `
    // }
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
        './iconfont.eot': 'vue-easytable/libs/font/iconfont.eot',
        './iconfont.woff': 'vue-easytable/libs/font/iconfont.woff',
        './iconfont.ttf': 'vue-easytable/libs/font/iconfont.ttf',
        './iconfont.svg': 'vue-easytable/libs/font/iconfont.svg',
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
