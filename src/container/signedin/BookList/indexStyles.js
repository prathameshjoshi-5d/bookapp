import React from 'react';
import { StyleSheet } from 'react-native';
import color from '../../../common/color';
import { SEMIBOLD } from '../../../common/font';

export const BookListStyles = () => {
  return StyleSheet.create({
    flex: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    container: {
      marginHorizontal: 15,
    },
    head: {
      fontSize: 25,
      fontFamily: SEMIBOLD
    },
    nobooktext: {
      marginTop: 30,
      textAlign: 'center',
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
    text: {
      fontSize: 16,
      fontWeight: 'bold',
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
