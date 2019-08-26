import React from 'react';

import XforTextField, { XforTextFieldProps } from './reactComponentLib';

export interface XforTextFieldContainer {
  value: XforTextFieldProps['value'];
  isFocused: XforTextFieldProps['isFocused'];
  isTouched: XforTextFieldProps['isTouched'];
  errorMessage: XforTextFieldProps['errorMessage'];
  label: XforTextFieldProps['label'];
  name: XforTextFieldProps['name'];
  type: XforTextFieldProps['type'];
  disabled: XforTextFieldProps['disabled'];
}

const XforTextFieldContainer: React.FC<XforTextFieldContainer> = ({
  value: initialValue,
  isFocused: initialIsFocused,
  isTouched: initialIsTouched,
  errorMessage,
  label,
  name,
  type,
  disabled,
}) => {
  const [value, setValue] = React.useState(initialValue);
  const [isFocused, setIsFocused] = React.useState(initialIsFocused);
  const [isTouched, setIsTouched] = React.useState(initialIsTouched);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValue(event.target.value);
    setIsTouched(true);
  };

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFocused(true);
    setIsTouched(true);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFocused(false);
  };

  const props = {
    value,
    isFocused,
    errorMessage,
    isTouched,
    label,
    name,
    type,
    disabled,
    onChange,
    onFocus,
    onBlur,
  };

  return <XforTextField {...props} />;
};

export default XforTextFieldContainer;
