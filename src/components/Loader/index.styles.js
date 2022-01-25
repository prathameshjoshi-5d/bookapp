import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../common/color';

export const LoaderStyle = () => {
  return StyleSheet.create({
    text: {
      fontSize: wp('5%'),
      color: '#777777',
      margin: wp('1%'),
      fontWeight: 'bold',
    },
    viewOne: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      elevation: 7,
      flex: 1,
      height: hp('100%'),
      width: wp('100%'),
      top: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    viewTwo: {
      justifyContent: 'center',
      alignItems: 'center',
      height: hp('20%'),
      width: wp('40%'),
      backgroundColor: color.textColorWhite,
      borderRadius: wp('1%'),
      paddingTop: hp('2%'),
    },
  });
};
