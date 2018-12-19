import React from 'react';
import { shallow } from 'enzyme';
import Header from 'components/Header';

describe('Header component', () => {
  it('should correctly render Header component', () => {
    const component = shallow(<Header />).dive();
    expect(component.exists()).toEqual(true);
  });
});
