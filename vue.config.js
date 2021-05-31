const path = require('path');
const Dotenv = require('dotenv-webpack');
const { API_HOST, WEBSOCKET_URL, HOST_URL } = process.env

module.exports = {
  publicPath: '/app/',
  pages: {
    index: {
      entry: 'src/packs/application.js',
      custom: `
        <script>
          window.chatwootConfig = {
            hostURL: '${HOST_URL}',
            fbAppId: '',
            signupEnabled: true,
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
    plugins: [
      new Dotenv()
    ]
  },
}
