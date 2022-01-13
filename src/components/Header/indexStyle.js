import {Dimensions, Platform, StyleSheet} from 'react-native';
import color from '../../common/color';
import {MEDIUM, REGULAR} from '../../common/font';

export const HeaderStyles = () => {
  return StyleSheet.create({
    container: {},
    view: {
      flexDirection: 'row',
      backgroundColor: color.headerColor,
      height: 65,
      justifyContent: 'space-between',
      //  marginTop: dimensions.DEVICE_HEIGHT * 0.02,
      // height:'100%',
      // width:'100%',
    },
    drawer: {
      // alignSelf:'flex-start',
      position: 'absolute',
      left: 20,
      marginTop: 20,
      // flex:0.3
      // backgroundColor:'black'
    },
    profile: {
      // alignSelf:'flex-end',
      // marginLeft:15,
      marginTop: 20,
      // position: 'absolute',
      right: 20,
      height: 30,
      width: 30,
      // flex:0.3
      // backgroundColor:'black'
    },
    textback: {
      fontFamily: REGULAR,
      fontSize: 16,
      marginTop: 20,
      color: color.TextColorWhite,
      marginLeft: 15,
      marginRight: -15,
      // alignItems:'center',
      // position:'absolute',
      // left:83,
      // right:83
      // alignContent:'center',
      // flex:0.73
    },
    text: {
      fontFamily: MEDIUM,
      fontSize: 16,
      marginTop: 20,
      color: color.TextColorWhite,
      // marginRight: -20
      // alignItems:'center',
      // position:'absolute',
      // left:83,
      // right:83
      // alignContent:'center',
      // flex:0.73
    },
    textl: {
      fontFamily: REGULAR,
      fontSize: 16,
      marginTop: 20,
      color: color.TextColorWhite,
      marginRight: 15,
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
