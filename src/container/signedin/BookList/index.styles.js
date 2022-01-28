import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const BookListStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: wp('5%'),
    },
    head: {
      fontSize: wp('6.5%'),
    },
    bookview: {
      flexDirection: 'row',
      marginTop: hp('1%'),
      backgroundColor: 'lightgrey',
      borderColor: 'grey',
      borderWidth: hp('0.1%'),
      borderRadius: wp('1%'),
      alignItems: 'center',
    },
    image: {
      height: hp('5%'),
      width: wp('10%'),
      borderRadius: wp('10%'),
      marginVertical: hp('1.5%'),
      marginLeft: wp('1.5%'),
    },
    textview: {
      marginLeft: wp('2%'),
      flex: 1,
    },
    text: {
      color: color.textColorBlack,
    },
  });
};
