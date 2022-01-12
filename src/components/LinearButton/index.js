import React from 'react';
import {Dimensions, View, StyleSheet, Text} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../common/color';
import {fontStyles} from '../../common/font';
import ShowText from '../Text';

const LinearButton = props => {
  const commonStyles = fontStyles();
  return (
      <LinearGradient colors={['#ff3399', '#70db70']}>
        <ShowText
          children={props.children}
          variant={props.variant}
          style={{
            padding: 10,
            textAlign: 'center',
            color: color.TextColorWhite,
          }}
        />
      </LinearGradient>
  );
};

export default LinearButton;
