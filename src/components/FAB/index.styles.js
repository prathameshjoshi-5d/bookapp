import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const FABStyle = () => {
  return StyleSheet.create({
    addButton: {
      right: wp('3%'),
      position: 'absolute',
      bottom: hp('3%'),
    },
    plusImg: {
      width: wp('15%'),
      height: hp('8%'),
    },
  });
};
