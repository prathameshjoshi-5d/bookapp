import React from 'react';
import {StyleSheet} from 'react-native';
import color from '../../common/color';

export const LoaderStyle = () => {
  return StyleSheet.create({
    text: {
      fontSize: 16,
      color: '#777777',
      margin: 16,
      fontWeight: 'bold',
    },
    viewOne: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      elevation: 7,
      flex: 1,
      height: '100%',
      width: '100%',
      top: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    viewTwo: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 210,
      backgroundColor: color.TextColorWhite,
      borderRadius: 5,
      paddingTop: 16,
    },
  });
};
