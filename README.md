# `<webcare-webshare>` Web Component

A web component that uses the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) to share a web site, falling back (on Desktop usually) to Copy to Clipboard.

* [Demo](https://zachleat.github.io/webcare-webshare/demo.html)
	* In use on the registration flow for [`conf.11ty.dev`](https://conf.11ty.dev/).
* [Blog post](https://www.zachleat.com/web/webcare-webshare/)
*  Inspired by [_How to let the user share the website they are on_—Thomas Steiner (web.dev)](https://web.dev/patterns/web-apps/share/)



## Features

* Defaults to copy URL when Web Share API is not available.
* Optionally override with your own copy-able content.
* Custom button text when Web Share API is not available.

## Installation

You can install via `npm` ([`@zachleat/webcare-webshare`](https://www.npmjs.com/package/@zachleat/webcare-webshare)) or download the `webcare-webshare.js` JavaScript file manually.

```shell
npm install @zachleat/webcare-webshare --save
```

Add `webcare-webshare.js` to your site’s JavaScript assets.

## Usage

Use `share-text` and `share-url` per the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API). The button is un-disabled when initialized.

```html
<webcare-webshare share-text="I am going to the 11ty Conference! #11ty #11tyConf" share-url="https://conf.11ty.dev/">
	<button disabled>Share your ticket!</button>
</webcare-webshare>
```

### Custom button text when Web Share API not available.

_Copy to clipboard_ workflow only. Use the `label-copy` (Before) and `label-after-copy` (After) attributes.

```html
<webcare-webshare share-text="I am going to the 11ty Conference! #11ty #11tyConf" share-url="https://conf.11ty.dev/" label-copy="📋 Copy your ticket URL" label-after-copy="✅ Copied to Clipboard">
	<button disabled>Share your ticket!</button>
</webcare-webshare>
```

### Set custom share content for copying.

_Copy to clipboard_ workflow only. Use `copy-text` to override `share-url` as the default content that is copied when using Copy to Clipboard.

```html
<webcare-webshare share-text="I am going to the 11ty Conference! #11ty #11tyConf" share-url="https://conf.11ty.dev/" copy-text="Go to https://conf.11ty.dev/">
	<button disabled>Share your ticket!</button>
</webcare-webshare>
```

