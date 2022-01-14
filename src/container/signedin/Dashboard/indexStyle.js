import React from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import color from '../../../common/color';
import { SEMIBOLD } from '../../../common/font';

export const DashboardStyle = () => {
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
    text: {
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
    head: {
      fontSize: 25,
      fontFamily: SEMIBOLD,
    },
    bookview: {
      flexDirection: 'row',
      marginTop: 10,
      backgroundColor: 'lightgrey',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      alignItems: 'center',
    },
    image: {
      height: 40,
      width: 40,
      borderRadius: 20,
      marginVertical: 5,
      marginLeft: 5,
    },
    textview: {
      marginLeft: 10,
      flex: 1,
    },
    textbook: {
      fontSize: 16,
      fontWeight: 'bold',
      color: color.TextColorBlack,
    },
  });
};
