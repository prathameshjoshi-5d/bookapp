import React from 'react';
import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {REGULAR} from '../../../common/font';

export const AddUserStyles = () => {
  return StyleSheet.create({
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1.5,
      marginVertical: 5,
      height: 44,
      fontFamily: REGULAR,
      fontSize: 15,
      borderColor: '#CCCCCC',
      backgroundColor: '#fff',
      borderRadius: 5,
      color: 'black',
    },
    flex: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    container: {
      marginHorizontal: 15,
    },
    head: {
      textAlign: 'center',
      fontSize: 22,
      marginTop: 20,
      color: color.themeColor4,
    },
    appname: {
      textAlign: 'center',
      fontSize: 26,
      marginTop: 5,
      marginBottom: 30,
      color: color.themeColor1,
    },
    switchscreen: {
      textAlign: 'center',
      marginTop: 20,
      textDecorationLine: 'underline',
    },
    image: {
      height: wp('40%'),
      width: wp('60%'),
    },
    imageView: {
      marginTop: 25,
      marginBottom: 10,
      alignItems: 'center',
    },
  });
};
