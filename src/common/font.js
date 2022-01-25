import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const REGULAR = 'OpenSans_SemiCondensed-Regular';
export const MEDIUM = 'OpenSans_SemiCondensed-Medium';
export const SEMIBOLD = 'OpenSans-SemiBold';
export const BOLD = 'OpenSans_SemiCondensed-SemiBold';

export const fontStyles = () =>
  StyleSheet.create({
    extraSmall: {
      fontFamily: REGULAR,
      fontSize: wp('2.7%'),
    },
    small: {
      fontFamily: REGULAR,
      fontSize: wp('3.5%'),
    },
    smallPlus: {
      fontFamily: SEMIBOLD,
      fontSize: wp('3.5%'),
    },
    medium: {
      fontFamily: REGULAR,
      fontSize: wp('3.8%'),
    },
    mediumPlus: {
      fontFamily: SEMIBOLD,
      fontSize: wp('3.8%'),
    },
    large: {
      fontFamily: REGULAR,
      fontSize: wp('4.5%'),
    },
    largePlus: {
      fontFamily: SEMIBOLD,
      fontSize: wp('4.5%'),
    },
    boldFont: {
      fontFamily: BOLD,
    },
  });
