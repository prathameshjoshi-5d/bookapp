import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const NoDataStyles = () => {
  return StyleSheet.create({
    nodatatext: {
      marginTop: hp('20%'),
      textAlign: 'center',
    },
  });
};
