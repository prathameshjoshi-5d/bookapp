import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const UsersStyle = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: wp('5%'),
    },
    listingview: {
      marginTop: hp('2%'),
      backgroundColor: 'lightgrey',
      borderColor: 'grey',
      borderWidth: hp('0.1%'),
      borderRadius: wp('1%'),
      justifyContent: 'center',
    },
    name: {
      padding: wp('2%'),
      color: color.textColorBlack,
    },
    email: {
      marginTop: hp('-1%'),
      padding: wp('2%'),
      color: color.textColorBlack,
    },
  });
};
