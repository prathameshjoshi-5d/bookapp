import React from 'react';
import {StyleSheet} from 'react-native';
import color from '../../../common/color';
import {REGULAR} from '../../../common/font';

export const AddCategoryStyles = () => {
  return StyleSheet.create({
    flex: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1.5,
      marginVertical: 5,
      height: 44,
      fontFamily: REGULAR,
      fontSize: 15,
      borderColor: '#CCCCCC',
      backgroundColor: color.TextColorWhite,
      borderRadius: 5,
      color: color.TextColorBlack,
    },
    container: {
      marginHorizontal: 15,
    },
    head: {
      textAlign: 'center',
      fontSize: 26,
      marginTop: 5,
      marginBottom: 30,
    },
  });
};
