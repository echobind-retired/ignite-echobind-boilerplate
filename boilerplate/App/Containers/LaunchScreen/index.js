import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../../Theme';

// Styles
import styles from './styles';

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.bg}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <Text style={styles.text}>TODO: add logo, look cool.</Text>
      </View>
    );
  }
}
