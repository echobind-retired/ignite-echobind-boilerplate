import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../Theme';

import styles from './styles';

class Button extends Component {
  render() {
    const { text, style } = this.props;

    return (
      <TouchableOpacity {...this.props} style={[styles.container, style]}>
        <Text style={styles.text}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
