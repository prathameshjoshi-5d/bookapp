import {Dimensions, StyleSheet} from 'react-native';
import {REGULAR} from '../../../common/font';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const AddBookStyles = () => {
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
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: 'orange',
      padding: wp('1%'),
      width: wp('70%'),
      marginVertical: hp('2%'),
    },
    buttonTextStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: wp('5%'),
      padding: wp('5%'),
      width: Dimensions.get('screen').width - 30,
    },
    button: {
      borderRadius: wp('20%'),
      padding: wp('2%'),
      marginBottom: hp('1%'),
    },
    button1: {
      borderRadius: wp('20%'),
      padding: wp('2%'),
      marginBottom: hp('1%'),
      alignSelf: 'flex-end',
    },
    textStyle: {
      color: 'black',
    },
    modalText: {
      marginBottom: 25,
      fontWeight: 'bold',
    },
    image: {
      height: Dimensions.get('screen').height / 3,
    },
    camera: {
      position: 'absolute',
      right: Dimensions.DEVICE_HEIGHT < 680 ? -9 : -5,
      alignSelf: 'flex-end',
    },
    error: {
      color: 'red',
      fontFamily: REGULAR,
    },
  });
};
