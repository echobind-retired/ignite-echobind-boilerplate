import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigation from '../../Navigation/AppNavigation';

import styles from './styles';

class RootContainer extends Component {
  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar hidden={true} barStyle="light-content" />
        <AppNavigation />
      </View>
    );
  }
}

export default RootContainer;
