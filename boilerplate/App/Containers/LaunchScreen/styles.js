import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {},
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  text: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 20
  }
});
