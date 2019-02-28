# xfor-text-field

> XFor TextField React Component

[![NPM](https://img.shields.io/npm/v/xfor-text-field.svg)](https://www.npmjs.com/package/xfor-text-field) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Demo app with implemented component](https://michal-wrzosek.github.io/xfor-text-field/)

<img alt="Demo screenshot" src="/demo-screenshot.png?raw=true" width="300" />

## Install

```bash
npm install --save xfor-text-field
```

Peer dependencies:
- prop-types: ^15.5.4
- react: ^15.0.0 || ^16.0.0
- react-dom: ^15.0.0 || ^16.0.0
- styled-components: ^3.4.9
- ramda: ^0.25.0

## Usage

XFor TextField component is designed for projects using styled-components.

Styles of this component expect `box-sizing: border-box;` set globally for all nodes and base font size set to 10px:

```css
html {
  font-size: 10px;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-size: 100%;
}
```

You can style this component by specifing some props in your theme (props shown here are the default ones):
```js
const theme = {
  // ...your other theme definitions

  xfor: { // namespace for XFor components
    textField: { // styles for TextField component
      height: 40, // in pixels
      fontColor: '#000000',
      borderColor: '#d8d8d8',
      borderErroredColor: 'red',
      bgColor: '#FFFFFF',
      bgDisabledColor: '#ececec',
      bgErroredColor: '#ffd9d9',
      fontDisabledColor: '#9a9a9a',
      labelColor: '#9c9c9c',
    },
  },
};
```

XFor TextField component is stateless so you need to wrap it in a class to manage its state. Check the example app [here](example/src/TextFieldContainer.jsx).

## License

MIT © [Michał Wrzosek](https://github.com/michal-wrzosek)

michal@wrzosek.pl

https://michal.wrzosek.pl
