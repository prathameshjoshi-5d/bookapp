import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../common/color';
import {MEDIUM, REGULAR} from '../../common/font';

export const HeaderStyles = () => {
  return StyleSheet.create({
    container: {},
    view: {
      flexDirection: 'row',
      backgroundColor: color.headerColor,
      height: hp('7%'),
      justifyContent: 'space-between',
      //  marginTop: dimensions.DEVICE_HEIGHT * 0.02,
      // height:'100%',
      // width:'100%',
    },
    drawer: {
      // alignSelf:'flex-start',
      position: 'absolute',
      left: wp('1%'),
      marginTop: hp('1%'),
      // flex:0.3
      // backgroundColor:'black'
    },
    profile: {
      // alignSelf:'flex-end',
      // marginLeft:15,
      marginTop: hp('1%'),
      // position: 'absolute',
      right: wp('3%'),
      height: hp('5%'),
      width: wp('10%'),
      // flex:0.3
      // backgroundColor:'black'
    },
    textback: {
      fontFamily: REGULAR,
      fontSize: wp('4%'),
      marginTop: hp('2%'),
      color: color.textColorWhite,
      marginLeft: wp('3%'),
      marginRight: wp('3%'),
      // alignItems:'center',
      // position:'absolute',
      // left:83,
      // right:83
      // alignContent:'center',
      // flex:0.73
    },
    text: {
      fontFamily: MEDIUM,
      fontSize: wp('4%'),
      marginTop: hp('2%'),
      color: color.textColorWhite,
      // marginRight: -'2%'
      // alignItems:'center',
      // position:'absolute',
      // left:83,
      // right:83
      // alignContent:'center',
      // flex:0.73
    },
    textl: {
      fontFamily: REGULAR,
      fontSize: wp('4%'),
      marginTop: hp('2%'),
      color: color.textColorWhite,
      marginRight: wp('3%'),
      // alignItems:'center',
      // position:'absolute',
      // left:83,
      // right:83
      // alignContent:'center',
      // flex:0.73
    },
    headerHeight: {
      height:
        Platform.OS === 'android'
          ? Dimensions.get('window').width * 0.05
          : Dimensions.get('window').width * 0.202,
    },
  });
};
