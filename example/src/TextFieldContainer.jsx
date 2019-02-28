import React, { Component } from 'react';

import TextField from 'xfor-text-field'

class TextFieldContainer extends Component {
  state = {
    value: this.props.value,
    isFocused: this.props.isFocused,
    isTouched: this.props.isTouched,
  }

  onChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ value: event.target.value, isTouched: true });
  }

  onFocus = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isFocused: true, isTouched: true });
  }

  onBlur = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isFocused: false });
  }

  render() {
    const {
      errorMessage,
      label,
      name,
      type,
      disabled,
    } = this.props;

    console.log(this.props);

    const {
      value,
      isFocused,
      isTouched,
    } = this.state;

    const props = {
      value,
      isFocused,
      errorMessage,
      isTouched,
      label,
      name,
      type,
      disabled,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };

    return <TextField {...props} />;
  }
}

export default TextFieldContainer;
