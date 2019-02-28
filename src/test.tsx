
import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import TextField from './'

Enzyme.configure({ adapter: new Adapter() });

const { shallow } = Enzyme;

describe('<TextField />', () => {
  const noop = () => {};
  const props = {
    value: 'Some value',
    isFocused: false,
    errorMessage: '',
    isTouched: false,
    label: 'Some label',
    name: 'test_text_field',
    type: 'text' as 'text',
    disabled: false,
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
  }

  it('renders', () => {
    const wrapper = shallow(<TextField {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
