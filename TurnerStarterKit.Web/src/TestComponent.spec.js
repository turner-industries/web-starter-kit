import React from 'react';
import {create} from 'react-test-renderer';

const TestComponent = ({test}) => <div>{test}</div>;

describe('test component', () => {
  it('sample test', () => {
    const tree = create(<TestComponent test="foo" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
