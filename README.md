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

XFor TextField component `dumb` as much as possible, though, you need to wrap it in a class to manage its state. Check the example app [here](example/src/TextFieldContainer.jsx).

List of props you can pass to the component:

```ts
type TextFieldProps = {
  /*
   * Value of the input
   */
  value: string;
  
  /*
   * Is input focused
   */
  isFocused: boolean;
  
  /*
   * Error messages to be shown (isTouch has to be set to true to display errors)
   */
  errorMessage: string;
  
  /*
   * Did input was touched by user (useful for displaying error messages). You don't want to show errors to the field that was not yet touched by user.
   */
  isTouched: boolean;
  
  /*
   * Field label
   */
  label: string;
  
  /*
   * Name of the input
   */
  name: string;
  
  /*
   * Type of the imput: [text, password, email]
   */
  type: TextFieldType;
  
  /*
   * Is input disabled
   */
  disabled: boolean,
  
  /*
   * Callback func that will be called on input change
   */
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  
  /*
   * Callback func that will be called on input focus
   */
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void,
  
  /*
   * Callback func that will be called on input blur
   */
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
}
```

## License

MIT © [Michał Wrzosek](https://github.com/michal-wrzosek)

michal@wrzosek.pl

https://michal.wrzosek.pl
