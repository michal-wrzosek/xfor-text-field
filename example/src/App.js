import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components';

import TextFieldContainer from './TextFieldContainer';

const Wrapper = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 400px;
  background-color: #FFF;
`;

const Title = styled.h1`
  text-align: center;
`;

const SubTitle = styled.h3`
  text-align: center;
`;

const Space = styled.div`
  height: ${({ spaces }) => spaces ? spaces * 20 : 20}px;
`;

export default class App extends Component {
  render () {
    const props = {
      value: '',
      isFocused: false,
      errorMessage: '',
      isTouched: false,
      label: '',
      name: 'test_text_field',
      type: 'text',
      disabled: false,
    };

    const theme = {
      xfor: {
        textField: {
          height: 40, // in pixels
          fontColor: '#089278',
          borderColor: '#00b795',
          borderErroredColor: '#ffbdbd',
          bgColor: '#e9fffb',
          bgDisabledColor: '#ececec',
          bgErroredColor: '#ffeded',
          fontDisabledColor: '#9a9a9a',
          labelColor: '#9ebbb6',
        },
      },
    };

    return (
      <Wrapper>
        <Title>XFor TextField React component</Title>
        <Space spaces={2} />
        <SubTitle>XFor TextField styled with default theme</SubTitle>
        <Space />
        <TextFieldContainer
          {...props}
          label={"Field with empty value"}
        />
        <Space />
        <TextFieldContainer
          {...props}
          label="Field with value"
          value="Some value"
        />
        <Space />
        <TextFieldContainer
          {...props}
          label=""
          errorMessage="Some example error without value"
          value=""
          isTouched={true}
        />
        <Space />
        <TextFieldContainer
          {...props}
          label=""
          errorMessage="Some example error with value"
          value="Example wrong value"
          isTouched={true}
        />
        <Space spaces={3} />
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <SubTitle>XFor TextField styled with custom theme</SubTitle>
            <Space />
            <TextFieldContainer
              {...props}
              label={"Field with empty value"}
            />
            <Space />
            <TextFieldContainer
              {...props}
              label="Field with value"
              value="Some value"
            />
            <Space />
            <TextFieldContainer
              {...props}
              label=""
              errorMessage="Some example error without value"
              value=""
              isTouched={true}
            />
            <Space />
            <TextFieldContainer
              {...props}
              label=""
              errorMessage="Some example error with value"
              value="Example wrong value"
              isTouched={true}
            />
          </React.Fragment>
        </ThemeProvider>
      </Wrapper>
    )
  }
}
