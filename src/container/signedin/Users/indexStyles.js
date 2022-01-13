import React from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import color from '../../../common/color';

export const UsersStyle = () => {
  return StyleSheet.create({
    flex: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    container: {
      marginHorizontal: 15,
    },
    listingview: {
      marginTop: 10,
      backgroundColor: 'lightgrey',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
    },
    name: {
      padding: 10,
      color: color.TextColorBlack,
    },
    email: {
      marginTop: -10,
      padding: 10,
      color: color.TextColorBlack,
    },
    addButton: {
      right: 20,
      position: 'absolute',
      bottom: 20,
    },
    plusImg: {
      width: 60,
      height: 60,
    },
  });
};
