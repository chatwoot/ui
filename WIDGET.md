### Host widget separately

This repository helps you to use widget seperate from the main codebase.

There are 2 parts to the widget.

1. The SDK which has functions to interact with website where the widget is integrated and load the widget frame described below.
2. The widget frame is the core piece of the widget. This is what interacts with the server and show the messages.

Both are build separately.

- WidgetFrame is built into an HTML page which can be rendered using a URL. You can configure this URL in SDK using the VUE_APP_WIDGET_URL env variable.
- SDK renders the WidgetFrame in an IFrame. If the VUE_APP_WIDGET_URL is passed, it will construct the URL accordingly.

The script that is shown to the user fetches the sdk.js which is build as part of the build process, which would internally render the WidgetFrame in an Iframe.

The script that should be shared with the end customer is as follows.

```js
<script>
  (function(d,t) {
    var BASE_URL = "<your-base-https-url>"
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src="<path-to-sdk.js> // As per the build config, it will be available at `/app/js/sdk.js`";
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({ websiteToken: '<GENERATED-WEBSITE-TOKEN>' })
    }
  })(document,"script");
</script>
```

### To test the set up locally


1. Create a website channel on Chatwoot API server. Set the website token in the env variable `WEBSITE_INBOX_TOKEN`. See `.env.example`

2. `yarn serve`

3. Visit `http://localhost:8080/app/sdk-test.html`, you would be able to see the widget loaded in the page.
