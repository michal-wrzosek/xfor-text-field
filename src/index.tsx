import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { pathOr } from 'ramda';

const THEME_NAMESPACE = 'xfor.textField';
const autoFillAnimationStartName = 'onAutoFillStart';
const autoFillAnimationStopName = 'onAutoFillStop';

const getThemeValueOrDefault = (propName: string, defaultValue: string | number) => (theme: any) =>
  pathOr(defaultValue, [...THEME_NAMESPACE.split('.'), propName])(theme);

export type TextFieldTheme = {
  height: number;
  fontColor: string;
  borderColor: string;
  borderErroredColor: string;
  bgColor: string;
  bgDisabledColor: string;
  bgErroredColor: string;
  fontDisabledColor: string;
  labelColor: string;
};

const theme = (theme: any): TextFieldTheme => ({
  height: getThemeValueOrDefault('height', 40)(theme),
  fontColor: getThemeValueOrDefault('fontColor', '#000000')(theme),
  borderColor: getThemeValueOrDefault('borderColor', '#d8d8d8')(theme),
  borderErroredColor: getThemeValueOrDefault('borderErroredColor', 'red')(theme),
  bgColor: getThemeValueOrDefault('bgColor', '#FFFFFF')(theme),
  bgDisabledColor: getThemeValueOrDefault('bgDisabledColor', '#ececec')(theme),
  bgErroredColor: getThemeValueOrDefault('bgErroredColor', '#ffd9d9')(theme),
  fontDisabledColor: getThemeValueOrDefault('fontDisabledColor', '#9a9a9a')(theme),
  labelColor: getThemeValueOrDefault('labelColor', '#9c9c9c')(theme),
});

type WrapperProps = {
  isFocused: boolean;
  isErrored: boolean;
  isEmpty: boolean;
  isAutoFilled: boolean;
  disabled: boolean;
}

const Input = styled.input``;
const Label = styled.div``;
const Wrapper = styled.div<WrapperProps>`
  position: relative;
  height: ${({ theme }) => theme.height}px;
  box-shadow: inset 0px ${({ isFocused }) => isFocused ? '-2px' : '-1px'} 0px 0px ${({ isErrored, theme }) => isErrored ? theme.borderErroredColor : theme.borderColor};
  background-color: ${({ isErrored, disabled, theme }) => (
    disabled ?
      theme.bgDisabledColor : isErrored ?
        theme.bgErroredColor : theme.bgColor
  )};

  ${Label} {
    display: flex;
    justify-content: flex-start;
    align-items: ${({ isFocused, isEmpty, isAutoFilled }) => isFocused || !isEmpty || isAutoFilled ? 'flex-start' : 'center'};
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

  ${Input} {
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    color: ${({ theme }) => theme.fontColor}
    background: none;
    border: 0;
    padding: 1.7rem 6px 0;
    margin: 0;
    font-size: 1.4rem;
    transition: all 0.30s ease-in-out;
    outline: none;
    ${({ disabled, theme }) => disabled ? `color: ${theme.fontDisabledColor}` : ''};

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
`;

type TextFieldType = 'text' | 'password' | 'email';

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

type TextFieldState = {
  isAutoFilled: boolean;
};

class TextField extends React.Component<TextFieldProps, TextFieldState> {

  private inputRef = React.createRef<HTMLInputElement>();

  state = {
    isAutoFilled: false,
  }

  componentDidMount() {
    const inputEl = this.inputRef.current;
    
    inputEl &&
    inputEl.addEventListener &&
    inputEl.addEventListener('animationstart', (e: AnimationEvent) => {
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

    const isErrored = isTouched && errorMessage.length > 0;

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
            innerRef={this.inputRef}
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
