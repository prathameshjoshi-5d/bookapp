import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import color from '../../../common/color';

export const BookDetailsStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#242424',
    },
    image: {
      height: Dimensions.get('screen').height / 2,
    },
    name: {
      color: color.TextColorWhite,
      fontSize: 30,
      textAlign: 'center',
    },
    view: {
      marginHorizontal: 15,
      marginTop: 5,
    },
    authorview: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20,
    },
    authortitle: {
      color: color.TextColorWhite,
    },
    authorname: {
      color: color.TextColorWhite,
    },
  });
};
