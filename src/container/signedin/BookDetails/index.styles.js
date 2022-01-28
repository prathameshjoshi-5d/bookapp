import {Dimensions, StyleSheet} from 'react-native';import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../../common/color';

export const BookDetailsStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#242424',
    },
    image: {
      height: Dimensions.get('screen').height / 2,
    },
    name: {
      color: color.textColorWhite,
      fontSize: wp('6.5%'),
      textAlign: 'center',
    },
    view: {
      marginHorizontal: wp('5%'),
      marginTop: hp('2%'),
    },
    authorview: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: hp('2%'),
    },
    authortitle: {
      color: color.textColorWhite,
    },
    authorname: {
      color: color.textColorWhite,
    },
  });
};
