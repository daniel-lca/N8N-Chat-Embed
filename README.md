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

<!-- IMPORTANT: replace @v1.0.0 with your desired release tag -->
<script src="https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Embed@v1.0.0/chat-embed.js"></script>
```


---

## full configuration (all options)

This example includes every supported configuration option.
Copy it, then remove anything you don’t need.

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
      primaryColor: '#4E76CC',
      secondaryColor: '#1E50BD',

      // background of the root container div (#n8n-chat-embed)
      backgroundColor: 'transparent',

      // background of the internal chat UI (header, message area, input)
      internalBackgroundColor: 'transparent',

      fontColor: '#333333',
      fontSize: '16px',

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
    ]
  };
</script>
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

Below you’ll see each property written as a full path so you know exactly where to place it.

### core

- ChatWidgetEmbedConfig.targetElementId
  - required. the id of your container div.

- ChatWidgetEmbedConfig.webhook.url
  - required. your n8n webhook URL.

- ChatWidgetEmbedConfig.webhook.route
  - optional. route identifier (string) to select a flow in n8n.

### branding (ChatWidgetEmbedConfig.branding.*)

- ChatWidgetEmbedConfig.branding.logo
  - URL to your logo image.

- ChatWidgetEmbedConfig.branding.name
  - chat/company/bot name.

- ChatWidgetEmbedConfig.branding.welcomeMessage
  - initial bot message.

- ChatWidgetEmbedConfig.branding.chatInputPlaceholder
  - placeholder text for the input field.

### main styling (ChatWidgetEmbedConfig.style.*)

- ChatWidgetEmbedConfig.style.primaryColor
  - main accent color (used as fallback for gradients).

- ChatWidgetEmbedConfig.style.secondaryColor
  - secondary accent color (used as fallback for gradients).

- ChatWidgetEmbedConfig.style.backgroundColor
  - background of the root container element (the div you embed into).

- ChatWidgetEmbedConfig.style.internalBackgroundColor
  - background of the internal chat UI.

- ChatWidgetEmbedConfig.style.fontColor
  - default text color.

- ChatWidgetEmbedConfig.style.fontSize
  - base font size.

### component styling (nested inside ChatWidgetEmbedConfig.style)

#### user bubble (ChatWidgetEmbedConfig.style.userBubble.*)

Put these inside:
ChatWidgetEmbedConfig.style.userBubble = { ... }

- ChatWidgetEmbedConfig.style.userBubble.bgColorStart
  - gradient start color.
  - if null, uses ChatWidgetEmbedConfig.style.primaryColor.

- ChatWidgetEmbedConfig.style.userBubble.bgColorEnd
  - gradient end color.
  - if null, uses ChatWidgetEmbedConfig.style.secondaryColor.

- ChatWidgetEmbedConfig.style.userBubble.textColor
  - text color inside user bubbles.

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

Put these inside:
ChatWidgetEmbedConfig.style.botBubble = { ... }

- ChatWidgetEmbedConfig.style.botBubble.bgColor
  - background color of bot bubbles.

- ChatWidgetEmbedConfig.style.botBubble.borderColor
  - border color of bot bubbles.

- ChatWidgetEmbedConfig.style.botBubble.textColor
  - text color inside bot bubbles.

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

Put these inside:
ChatWidgetEmbedConfig.style.sendButton = { ... }

- ChatWidgetEmbedConfig.style.sendButton.bgColorStart
  - gradient start color.
  - if null, uses ChatWidgetEmbedConfig.style.primaryColor.

- ChatWidgetEmbedConfig.style.sendButton.bgColorEnd
  - gradient end color.
  - if null, uses ChatWidgetEmbedConfig.style.secondaryColor.

- ChatWidgetEmbedConfig.style.sendButton.textColor
  - text/icon color on the send button.

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

Put these inside:
ChatWidgetEmbedConfig.style.input = { ... }

- ChatWidgetEmbedConfig.style.input.bgColor
  - input background color.
  - if null, uses ChatWidgetEmbedConfig.style.internalBackgroundColor.

- ChatWidgetEmbedConfig.style.input.borderColor
  - input border color.

- ChatWidgetEmbedConfig.style.input.textColor
  - input text color.
  - if null, uses ChatWidgetEmbedConfig.style.fontColor.

- ChatWidgetEmbedConfig.style.input.placeholderColor
  - placeholder text color.
  - if null, derived from ChatWidgetEmbedConfig.style.fontColor with opacity.

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

Put these inside:
ChatWidgetEmbedConfig.style.suggestedQuestion = { ... }

- ChatWidgetEmbedConfig.style.suggestedQuestion.bgColor
  - background color of the suggested question bubbles.

- ChatWidgetEmbedConfig.style.suggestedQuestion.borderColor
  - border color of the suggested question bubbles.

- ChatWidgetEmbedConfig.style.suggestedQuestion.textColor
  - text color of the suggested question bubbles.

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

Put these inside:
ChatWidgetEmbedConfig.markdown = { ... }

- ChatWidgetEmbedConfig.markdown.enabled
  - enable/disable markdown rendering.

- ChatWidgetEmbedConfig.markdown.sanitize
  - enable/disable HTML sanitization.

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
