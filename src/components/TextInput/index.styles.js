import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const InputTextStyles = () => {
  return StyleSheet.create({
    input: {
      padding: wp('2%'),
      borderWidth: wp('0.5%'),
      marginVertical: hp('1%'),
      height: hp('6%'),
      fontSize: wp('4%'),
      borderColor: '#CCCCCC',
      backgroundColor: '#fff',
      borderRadius: wp('0.5%'),
      color: 'black',
    },
  });
};
