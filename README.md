# N8N Chat Embed 💬

A minimal, highly customizable chat embed designed to be placed inside any container on your website.
It connects directly to your n8n workflows via a webhook and supports advanced UI and behavior configuration.

---

## quick usage (CDN)

Include a container element, define the configuration object, and load the script.
Place this code anywhere inside the <body> of your page.

### minimal installation template

```html
<!--
  Ensure you have a <div> with the ID "n8n-chat-embed" in your HTML.
  The chat will be created inside that element.
-->

<script>
  window.ChatWidgetEmbedConfig = {
    targetElementId: 'n8n-chat-embed',
    webhook: {
      url: 'YOUR_N8N_WEBHOOK_URL',
      route: 'general'
    },
    branding: {
      logo: 'YOUR_LOGO_URL',
      name: 'YOUR COMPANY NAME',
      welcomeMessage: 'Hi! How can we help you today?',
      chatInputPlaceholder: 'Type your message here...'
    },
    style: {
      primaryColor: '#854fff',
      secondaryColor: '#6b3fd4',
      backgroundColor: 'transparent',
      internalBackgroundColor: '#ffffff',
      fontColor: '#333333',
      fontSize: '14px'
    }
  };
</script>

<!-- IMPORTANT: replace @v1.0.1 with your desired release tag -->
<script src="https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Embed@v1.0.1/chat-embed.js"></script>
```


---

## full configuration (all options)

This example includes every supported configuration option.
Copy it, then remove anything you don’t need.

```html
```html
<script>
  window.ChatWidgetEmbedConfig = {
    // required: must match the container div id
    targetElementId: 'n8n-chat-embed',

    webhook: {
      url: 'YOUR_N8N_WEBHOOK_URL',
      route: 'general'
    },

    branding: {
      logo: 'YOUR_LOGO_URL',
      name: 'YOUR COMPANY NAME',
      welcomeMessage: 'Hi! How can we help you today?',
      chatInputPlaceholder: 'Type your message here...'
    },

    style: {
      primaryColor: '#854fff',
      secondaryColor: '#6b3fd4',

      // background of the root container div (#n8n-chat-embed)
      backgroundColor: 'transparent',

      // background of the internal chat UI (header, message area, input)
      internalBackgroundColor: '#ffffff',

      fontColor: '#333333',
      fontSize: '14px',

      // style.userBubble.*
      userBubble: {
        bgColorStart: null, // if null, uses primaryColor
        bgColorEnd: null,   // if null, uses secondaryColor
        textColor: 'white'
      },

      // style.botBubble.*
      botBubble: {
        bgColor: '#f0f2f5',
        borderColor: '#e0e2e5',
        textColor: '#333333'
      },

      // style.sendButton.*
      sendButton: {
        bgColorStart: null, // if null, uses primaryColor
        bgColorEnd: null,   // if null, uses secondaryColor
        textColor: 'white'
      },

      // style.input.*
      input: {
        bgColor: null,            // if null, uses internalBackgroundColor
        borderColor: '#d0d2d5',
        textColor: null,          // if null, uses fontColor
        placeholderColor: null    // if null, derived from fontColor with opacity
      },

      // style.suggestedQuestion.*
      suggestedQuestion: {
        bgColor: '#e6f0ff',
        borderColor: '#cce0ff',
        textColor: '#1E50BD'
      }
    },

    markdown: {
      enabled: true,
      sanitize: true
    },

    suggestedQuestions: [
      'What can you help me with?',
      'How does this work?'
    ],

    // Geolocation: Set to true to fetch user country before loading
    loadGeolocation: false 
  };
</script>

<!-- 
  Paste this script immediately after the configuration above.
  It handles the geolocation (if enabled) and loads the chat widget.
  IMPORTANT: If you use this script, DO NOT include the standard chat-embed.js script tag.
-->
<script>
    (function() {
        const config = window.ChatWidgetEmbedConfig;
        
        // You can change this to point to a specific version if needed
        const embedScriptUrl = "https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Embed@latest/chat-embed.js";

        const loadWidget = () => {
            const script = document.createElement('script');
            script.src = embedScriptUrl;
            document.body.appendChild(script);
        };

        if (config && config.loadGeolocation) {
            fetch('https://api.country.is')
                .then(response => response.json())
                .then(data => {
                    config.userCountry = data.country;
                    console.log('User country loaded:', data.country);
                    loadWidget();
                })
                .catch(error => {
                    console.error('Failed to load user country:', error);
                    loadWidget(); // Fallback to loading widget anyway
                });
        } else {
            loadWidget();
        }
    })();
</script>
```
```

---

## configuration reference (where each option goes)

Everything lives under:

- window.ChatWidgetEmbedConfig
  - webhook
  - branding
  - style
  - markdown
  - suggestedQuestions
  - loadUserCountry

Below you’ll see each property written as a full path so you know exactly where to place it.

### core


| Property | Description |
|----------|-------------|
| `targetElementId` | **Required**. The ID of the `div` where the widget will be rendered. |
| `webhook.url` | **Required**. Your n8n production webhook URL. |
| `webhook.route` | Optional. A route identifier to handle different flows in your n8n workflow. |
| `userCountry` | Optional. Manually provide a user country code string (e.g. "US"). |


### branding (ChatWidgetEmbedConfig.branding.*)


| Property | Description |
|----------|-------------|
| `logo` | URL to your logo image. |
| `name` | Chat/company/bot name. |
| `welcomeMessage` | Initial bot message. |
| `chatInputPlaceholder` | Placeholder text for the input field. |


### main styling (ChatWidgetEmbedConfig.style.*)


| Property | Description |
|----------|-------------|
| `primaryColor` | Main accent color (used as fallback for gradients). |
| `secondaryColor` | Secondary accent color (used as fallback for gradients). |
| `backgroundColor` | Background of the root container element. |
| `internalBackgroundColor` | Background of the internal chat UI. |
| `fontColor` | Default text color. |
| `fontSize` | Base font size. |


### component styling (nested inside ChatWidgetEmbedConfig.style)

#### user bubble (ChatWidgetEmbedConfig.style.userBubble.*)

Put these inside: `ChatWidgetEmbedConfig.style.userBubble = { ... }`

| Property | Description |
|----------|-------------|
| `bgColorStart` | Gradient start color. If null, uses `primaryColor`. |
| `bgColorEnd` | Gradient end color. If null, uses `secondaryColor`. |
| `textColor` | Text color inside user bubbles. |


Example:

```js
style: {
  userBubble: {
    bgColorStart: '#111111',
    bgColorEnd: '#333333',
    textColor: '#ffffff'
  }
}
```

#### bot bubble (ChatWidgetEmbedConfig.style.botBubble.*)

Put these inside: `ChatWidgetEmbedConfig.style.botBubble = { ... }`

| Property | Description |
|----------|-------------|
| `bgColor` | Background color of bot bubbles. |
| `borderColor` | Border color of bot bubbles. |
| `textColor` | Text color inside bot bubbles. |


Example:

```js
style: {
  botBubble: {
    bgColor: '#f0f2f5',
    borderColor: '#e0e2e5',
    textColor: '#333333'
  }
}
```

#### send button (ChatWidgetEmbedConfig.style.sendButton.*)

Put these inside: `ChatWidgetEmbedConfig.style.sendButton = { ... }`

| Property | Description |
|----------|-------------|
| `bgColorStart` | Gradient start color. If null, uses `primaryColor`. |
| `bgColorEnd` | Gradient end color. If null, uses `secondaryColor`. |
| `textColor` | Text/icon color on the send button. |


Example:

```js
style: {
  sendButton: {
    bgColorStart: null,
    bgColorEnd: null,
    textColor: 'white'
  }
}
```

#### input field (ChatWidgetEmbedConfig.style.input.*)

Put these inside: `ChatWidgetEmbedConfig.style.input = { ... }`

| Property | Description |
|----------|-------------|
| `bgColor` | Input background color. If null, uses `internalBackgroundColor`. |
| `borderColor` | Input border color. |
| `textColor` | Input text color. If null, uses `fontColor`. |
| `placeholderColor` | Placeholder text color. If null, derived from `fontColor`. |


Example:

```js
style: {
  input: {
    bgColor: '#ffffff',
    borderColor: '#d0d2d5',
    textColor: '#111111',
    placeholderColor: '#777777'
  }
}
```

#### suggested questions (ChatWidgetEmbedConfig.style.suggestedQuestion.*)

Put these inside: `ChatWidgetEmbedConfig.style.suggestedQuestion = { ... }`

| Property | Description |
|----------|-------------|
| `bgColor` | Background color of the suggested question bubbles. |
| `borderColor` | Border color of the suggested question bubbles. |
| `textColor` | Text color of the suggested question bubbles. |


Example:

```js
style: {
  suggestedQuestion: {
    bgColor: '#e6f0ff',
    borderColor: '#cce0ff',
    textColor: '#1E50BD'
  }
}
```

### markdown (ChatWidgetEmbedConfig.markdown.*)

Put these inside: `ChatWidgetEmbedConfig.markdown = { ... }`

| Property | Description |
|----------|-------------|
| `enabled` | Enable/disable markdown rendering. |
| `sanitize` | Enable/disable HTML sanitization. |


Example:

```js
markdown: {
  enabled: true,
  sanitize: true
}
```

### suggested questions list (ChatWidgetEmbedConfig.suggestedQuestions)

Put this at the top level:
ChatWidgetEmbedConfig.suggestedQuestions = [ ... ]

Example:

```js
suggestedQuestions: [
  "What is your pricing?",
  "How do I duplicate a template?"
]
```
