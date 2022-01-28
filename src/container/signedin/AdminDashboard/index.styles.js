import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const AdminDashboardStyle = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: wp('5%'),
    },
    text: {
      padding: wp('2%'),
      color: color.textColorBlack,
    },
    option: {
      marginTop: hp('2%'),
      backgroundColor: 'lightgrey',
      borderColor: 'grey',
      borderWidth: hp('0.2%'),
      borderRadius: wp('1%'),
      alignItems: 'center',
      width: '50%',
    },
    row: {
      flexDirection: 'row',
    },
    head: {
      textAlign: 'center',
      marginBottom: hp('4%'),
      fontSize: wp('6.5%'),
    },
  });
};
