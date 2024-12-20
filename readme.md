# Better iFrame

Better iFrame is a custom HTML element that creates an iFrame which asks for permission before loading a 3rd party service. This is useful for complying with regulations such as GDPR.

## Features

- Customizable appearance (primary color, border radius, height, background image)
- Displays a consent message before loading the iFrame
- Easy to use and integrate into any HTML page

## Installation

To use Better iFrame, simply include the `index.js` script in your HTML file:

```html
<script src="https://github.com/nilsbentlage/better-iframe/raw/refs/heads/main/index.js"></script>
```

## Usage

Add the better-iframe element to your HTML and customize its attributes as needed:

## Attributes

For `border-radius` and `height` you can use any valid CSS value, but don't forget to include the unit (e.g. `px`, `em`, `%`).

| Attribute       | Type     | Description                                             |
| --------------- | -------- | ------------------------------------------------------- |
| `src`           | `string` | The URL of the 3rd party service to load in the iFrame. |
| `image-src`     | `string` | The background image URL for the consent container.     |
| `primary-color` | `string` | The primary color for the consent button.               |
| `border-radius` | `string` | The border radius for the consent container and button. |
| `height`        | `string` | The height of the iFrame.                               |

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Author

Nils Bentlage - [GitHub](https://github.com/nilsbentlage)
