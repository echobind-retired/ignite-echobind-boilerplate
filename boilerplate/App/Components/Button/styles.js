import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.electricBlue,
    padding: 10,
    width: '100%',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.white
  }
});
