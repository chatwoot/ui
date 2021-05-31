# @chatwoot/ui

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize the API Host or Websocket URL

Go to `public/index.html`.

The basic config is of the format shown below.

```js
window.chatwootConfig = {
  hostURL: 'http://localhost:8080',
  fbAppId: '',
  signupEnabled: true,
  enabledLanguages: [
    {
      "name":"English (en)",
      "iso_639_1_code":"en"
    }
  ],
  selectedLocale: 'en',
  apiHost: 'http://localhost:3000',
  websocketURL: 'ws://localhost:3000'
}
```

1. `hostURL` - This is the URL at which frontend app will be deployed.
2. `fbAppId` - This is Facebook Developer Application ID, used if FB integration needs to enabled.
3. `signupEnabled` - This is the flag used to disable signup from frontend, you would have disable the signups in the API as well separately.
4. `enabledLanugages` - List of locales available.
5. `selectedLocale` - Currently active locale, default `en`.
6. `apiHost` - Base URL of Chatwoot API, make sure that the Chatwoot server is running on API mode, other APIs will fail.
7. `websocketURL` - Base URL to connect to websocket. If you are running a production server then it would be `wss://<app-domain.com>`

These configs can be moved to a webpack config if needed and can be injected during the build time.

### Customize build configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
