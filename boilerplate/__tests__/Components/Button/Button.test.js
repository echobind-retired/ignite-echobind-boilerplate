import 'react-native';
import React from 'react';
import Button from '../../../App/Components/Button';
import renderer from 'react-test-renderer';

describe('Button', () => {
  describe('text prop', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<Button text="Go" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('additional props', () => {
    it('adds them as props to the underlying TouchableOpacity', () => {
      const tree = renderer.create(<Button what="true" the="heck" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
