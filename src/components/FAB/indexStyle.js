import React from 'react';
import {StyleSheet} from 'react-native';
import color from '../../common/color';

export const FABStyle = () => {
  return StyleSheet.create({
    addButton: {
      right: 20,
      position: 'absolute',
      bottom: 20,
    },
    plusImg: {
      width: 40,
      height: 40,
    },
  });
};
