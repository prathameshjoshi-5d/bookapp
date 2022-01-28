import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const ForgotPasswordStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: wp('5%'),
    },
    head: {
      textAlign: 'center',
      marginTop: hp('5%'),
      color: color.themeColor4,
    },
    appname: {
      textAlign: 'center',
      fontSize: wp('6.5%'),
      marginTop: hp('5%'),
      marginBottom: hp('2%'),
      color: color.themeColor1,
    },
    switchscreen: {
      textAlign: 'center',
      marginTop: hp('2%'),
      textDecorationLine: 'underline',
    },
  });
};
