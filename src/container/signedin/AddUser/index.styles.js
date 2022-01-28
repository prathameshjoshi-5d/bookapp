import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const AddUserStyles = () => {
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
    appname: {
      textAlign: 'center',
      fontSize: 26,
      marginTop: 5,
      marginBottom: 30,
      color: color.themeColor1,
    },
    switchscreen: {
      textAlign: 'center',
      marginTop: 20,
      textDecorationLine: 'underline',
    },
    image: {
      height: wp('40%'),
      width: wp('60%'),
    },
    imageView: {
      marginTop: 25,
      marginBottom: 10,
      alignItems: 'center',
    },
  });
};
