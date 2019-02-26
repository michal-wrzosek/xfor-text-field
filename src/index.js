import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { pathOr } from 'ramda';

const THEME_NAMESPACE = 'xfor.textField';
const autoFillAnimationStartName = 'onAutoFillStart';
const autoFillAnimationStopName = 'onAutoFillStop';

const getThemeValueOrDefault = (propName, defaultValue) => (theme) =>
  pathOr(defaultValue, [...THEME_NAMESPACE.split('.'), propName])(theme);

const theme = (theme) => ({
  height: getThemeValueOrDefault('height', 40)(theme),
  borderColor: getThemeValueOrDefault('borderColor', '#d8d8d8')(theme),
  borderErroredColor: getThemeValueOrDefault('borderErroredColor', 'red')(theme),
  bgColor: getThemeValueOrDefault('bgColor', '#FFFFFF')(theme),
  bgDisabledColor: getThemeValueOrDefault('bgDisabledColor', '#ececec')(theme),
  bgErroredColor: getThemeValueOrDefault('bgErroredColor', '#ffd9d9')(theme),
  fontDisabledColor: getThemeValueOrDefault('fontDisabledColor', '#9a9a9a')(theme),
  labelColor: getThemeValueOrDefault('labelColor', '#9c9c9c')(theme),
});

const Input = styled.input``;
const Label = styled.div``;
const Wrapper = styled.div`
  position: relative;
  height: ${({ theme }) => theme.height}px;
  border-bottom-width: ${({ isFocused }) => isFocused ? '2px' : '1px'};
  border-bottom-style: solid;
  border-bottom-color: ${({ isErrored, theme }) => isErrored ? theme.borderErroredColor : theme.borderColor};
  background-color: ${({ isErrored, disabled, theme }) => (
    disabled ?
      theme.bgDisabledColor : isErrored ?
        theme.bgErroredColor : theme.bgColor
  )};

  > ${Input} {
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background: none;
    border: 0;
    padding: 1.7rem 6px 0;
    margin: 0;
    font-size: 1.4rem;
    transition: all 0.30s ease-in-out;
    outline: none;
    ${({ disabled, theme }) => disabled ? `color: ${theme.fontDisabledColor};` : ''}

    // Browser autofill hack to expose animation event for JS
    &:-webkit-autofill {
      animation-name: ${autoFillAnimationStartName};
    }
    &:not(:-webkit-autofill) {
      animation-name: ${autoFillAnimationStopName};
    }
    @keyframes ${autoFillAnimationStartName} {
      from {/**/}
      to {/**/}
    }
    @keyframes ${autoFillAnimationStopName} {
      from {/**/}
      to {/**/}
    }
  }

  > ${Label} {
    display: flex;
    justify-content: flex-start;
    align-items: ${({ isFocused, isEmpty, isAutoFilled }) =>
    isFocused || !isEmpty || isAutoFilled ? 'flex-start' : 'center'};
    position: absolute;
    line-height: 1;
    pointer-events: none;
    font-size: ${({ isFocused, isEmpty, isAutoFilled }) => isFocused || !isEmpty || isAutoFilled ? '1' : '1.4'}rem;
    top: 6px;
    right: 6px;
    bottom: 6px;
    left: 6px;
    color: ${({ theme }) => theme.labelColor};
  }
`;

class TextField extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    isTouched: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email']),
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  state = {
    isAutoFilled: false,
  }

  componentDidMount() {
    this.input.addEventListener &&
    this.input.addEventListener('animationstart', (e) => {
      switch (e.animationName) {
      case autoFillAnimationStartName:
        this.setState({ isAutoFilled: true });
        break;
      case autoFillAnimationStopName:
        this.setState({ isAutoFilled: false });
        break;
      default:
        break;
      }
    });
  }

  render() {
    const {
      value,
      isFocused,
      errorMessage,
      isTouched,
      label,
      name,
      type = 'text',
      disabled = false,
      onChange,
      onFocus,
      onBlur,
    } = this.props;

    const {
      isAutoFilled,
    } = this.state;

    const isErrored = isTouched && errorMessage;

    return (
      <ThemeProvider theme={theme}>
        <Wrapper
          isFocused={isFocused}
          isErrored={isErrored}
          isEmpty={!value.length}
          isAutoFilled={isAutoFilled}
          disabled={disabled}
        >
          <Input
            innerRef={el => this.input = el}
            type={type}
            name={name}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            value={value}
          />
          <Label>
            {isErrored ? errorMessage : label}
          </Label>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default TextField;
