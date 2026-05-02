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
    loadGeolocation: false,

    // Pre-chat form configuration
    prechat: {
      enabled: false,
      title: "Let's start",
      description: "Please fill out the form below to start chatting.",
      titleFontSize: "24px",
      submitLabel: "Start Chat",
      requiredFieldMarking: "*",
      inputs: [
        { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
        { id: 'email', label: 'Email', type: 'email', placeholder: 'Your email', required: true }
      ]
    },

    // CTA buttons: define presets that n8n can trigger via [#cta:preset-name] tags
    ctaButtons: {
      'send-email': {
        label: 'Send to my Email',
        popupTitle: 'Send to your Email',
        popupSubtitle: "We'll send this information to your inbox.",
        fields: [
          { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
          { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' }
        ],
        messagePrefix: 'I would like to receive that information in my Email',
        submitLabel: 'Submit'
      }
    }
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
  - prechat
  - ctaButtons

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

### pre-chat form (ChatWidgetEmbedConfig.prechat.*)

Put these inside: `ChatWidgetEmbedConfig.prechat = { ... }`

| Property | Description |
|----------|-------------|
| `enabled` | Enable/disable the pre-chat form. Default `false`. |
| `title` | Title displayed above the form. |
| `description` | Subheading text displayed below the title. Default empty. |
| `titleFontSize` | Font size of the title. Default `24px`. |
| `submitLabel` | Text on the submit button. |
| `requiredFieldMarking` | string to append to label of required fields. Default `*`. |
| `inputs` | Array of input field objects. |

#### input object structure

| Property | Description |
|----------|-------------|
| `id` | Unique identifier for the field (used in form data). |
| `label` | Label text displayed above the input. |
| `type` | HTML input type (e.g., `text`, `email`). |
| `placeholder` | Placeholder text for the input. |
| `required` | Boolean, whether the field is required. |

Example:

```js
prechat: {
  enabled: true,
  title: "Contact Us",
  inputs: [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'query', label: 'Topic', type: 'text', placeholder: 'Billing' }
  ]
}
```

### CTA buttons (ChatWidgetEmbedConfig.ctaButtons.*)

CTA (Call-to-Action) buttons let your n8n workflow insert interactive buttons inside bot messages. When clicked, they open an in-chat popup form. On submit, a hidden message is sent back to n8n with the collected data — the user never sees the message, but n8n processes it like any other input.

**No defaults are provided.** If `ctaButtons` is not configured, any CTA tags in messages are silently removed.

#### how it works

1. Define one or more **presets** in `ctaButtons` (each preset is a named key)
2. In your n8n workflow, include a CTA tag in the bot's response message
3. The chat renders a branded button in place of the tag
4. User clicks → popup form → submit → hidden message sent to n8n

#### tag syntax (what n8n sends in the message)

| Tag | Result |
|-----|--------|
| `[#cta:send-email]` | Renders a button using the `send-email` preset's default label |
| `[#cta:send-email:Get this via Email]` | Same preset, but overrides the button text |

The preset name must match a key in your `ctaButtons` config. If it doesn't exist, the tag is removed and a warning is logged to the browser console.

#### preset properties

Put these inside: `ChatWidgetEmbedConfig.ctaButtons.yourPresetName = { ... }`

| Property | Required | Description |
|----------|----------|-------------|
| `label` | Yes | Default text shown on the button (can be overridden in the tag). |
| `popupTitle` | Yes | Title displayed at the top of the popup form. |
| `popupSubtitle` | Yes | Subtitle/description shown below the title. |
| `fields` | Yes | Array of form field objects (see below). |
| `messagePrefix` | Yes | First line of the hidden message sent on submit. |
| `submitLabel` | No | Text on the popup's submit button. Default `"Submit"`. |

#### field object structure

| Property | Required | Description |
|----------|----------|-------------|
| `id` | Yes | Unique identifier for the field. |
| `label` | Yes | Label text displayed above the input. |
| `type` | No | HTML input type (`text`, `email`, `tel`, etc.). Default `"text"`. |
| `required` | No | Whether the field must be filled. Default `false`. |
| `placeholder` | No | Placeholder text inside the input. |

#### hidden message format

When the user submits the popup form, a hidden message is sent to n8n in this format:

```
{messagePrefix}
{Field 1 Label}: {value}
{Field 2 Label}: {value}
```

For example, with the `send-email` preset below:

```
I would like to receive that information in my Email
Name: John Doe
Email: john@example.com
```

#### behavior

- Each button is **permanently disabled** after its form is submitted (one-use).
- Multiple CTA buttons in different messages work **independently** — disabling one does not affect others.
- All active CTA buttons are **temporarily disabled** while any message is being sent, and re-enabled when the response arrives.
- The popup opens **inside the chat container** (not fullscreen), so it works safely in iframes.
- Form values are **cached per preset** — after the first submission, any subsequent button using the same preset will auto-send with the previously entered data without showing the form again.

#### example: send to email

```js
ctaButtons: {
  'send-email': {
    label: 'Send to my Email',
    popupTitle: 'Send to your Email',
    popupSubtitle: "We'll send this information to your inbox.",
    fields: [
      { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' }
    ],
    messagePrefix: 'I would like to receive that information in my Email',
    submitLabel: 'Submit'
  }
}
```

n8n sends: `Here's your tax summary. [#cta:send-email]`

#### example: request a callback

```js
ctaButtons: {
  'send-email': { /* ... */ },
  'request-call': {
    label: 'Request a Callback',
    popupTitle: 'Request a Callback',
    popupSubtitle: "Leave your details and we'll call you back.",
    fields: [
      { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
      { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+1 555-0123' },
      { id: 'time', label: 'Preferred Time', type: 'text', required: false, placeholder: 'e.g. Mornings' }
    ],
    messagePrefix: 'I would like to request a callback',
    submitLabel: 'Call me'
  }
}
```

n8n sends: `Would you like us to call you? [#cta:request-call]`
