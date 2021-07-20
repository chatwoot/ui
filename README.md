# @chatwoot/ui

## Prerequisite

Clone the repo into your local development environment.

### Update to latest chatwoot UI (optional)

If you want to work over the latest chatwoot UI, replace the `src` directory contents in this repo with the latest chatwoot [app/javascript](https://github.com/chatwoot/chatwoot/tree/develop/app/javascript) folder.

> Doing this step will require you to update the dependencies accordingly in your package.json if you face errors

### Run Chatwoot API server

Run the Chatwoot server in API only mode. You can do this by setting the Environment variable `CW_API_ONLY_SERVER` to true before starting the chatwoot app.

## Project setup
```
cp .env.example .env

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

HOST_URL, API_HOST and WEBSOCKET_URL can be configured via environment variable during build time, if you would like to see the entire config, go to `vue/config.js`.

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

### Customize build configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
