import React from 'react';
import { render, Simulate } from 'react-testing-library';
/**
* dom-testing-library/extend-expect adds 'jest-dom'
* toBeInTheDOM
* toHaveTextContent
* toHaveAttribute
* toHaveClass
*/
import 'dom-testing-library/extend-expect';
import BasicStateless from '../basic-stateless';

const props = {
  toggle: false,
  handleToggle: jest.fn(() => {
    props.toggle = !props.toggle;
  }),
};


describe('<BasicStateless />', () => {
  it('Checkbox has a label and checked=false', () => {
    const { getByLabelText } = render(<BasicStateless {...props} />);
    expect(getByLabelText('Current State')).toBeInTheDOM();
    expect(getByLabelText('Current State').checked).toEqual(false);
  });
  it('Checkbox and Button handleToggle from props', () => {
    const {
      container,
      getByLabelText,
      getByText,
      getByTestId,
    } = render(<BasicStateless {...props} />);
    Simulate.change(getByLabelText('Current State')); // simulates checking box
    expect(props.toggle).toEqual(true);
    expect(getByTestId('root').style.color).toEqual('blue');
    render(<BasicStateless {...props} />, { container }); // rerender on props change
    expect(getByLabelText('Current State').checked).toEqual(true);
    expect(getByTestId('root').style.color).toEqual('green');
    Simulate.click(getByText('Click me!')); // simulates button click
    expect(props.handleToggle).toHaveBeenCalledTimes(2);
    render(<BasicStateless {...props} />, { container }); // rerender on props change
    expect(getByTestId('root').style.color).toEqual('blue');
    expect(getByLabelText('Current State').checked).toEqual(false);
  });
});
