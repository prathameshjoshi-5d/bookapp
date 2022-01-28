import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const ChangePasswordStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: wp('5%'),
    },
    head: {
      textAlign: 'center',
      fontSize: wp('6.5%'),
      marginTop: hp('5%'),
      marginBottom: hp('3%'),
    },
  });
};
