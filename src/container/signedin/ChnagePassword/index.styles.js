import {StyleSheet} from 'react-native';
import color from '../../../common/color';

export const ChangePasswordStyles = () => {
  return StyleSheet.create({
    flex: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    container: {
      marginHorizontal: 15,
    },
    head: {
      textAlign: 'center',
      fontSize: 26,
      marginTop: 5,
      marginBottom: 30,
    },
  });
};
