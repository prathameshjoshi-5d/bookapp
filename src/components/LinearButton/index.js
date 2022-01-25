import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../common/color';
import ShowText from '../Text';

const LinearButton = props => {
  return (
    <LinearGradient colors={['#ff3399', '#70db70']}>
      <ShowText
        children={props.children}
        variant={props.variant}
        style={{
          padding: 10,
          textAlign: 'center',
          color: color.textColorWhite,
        }}
      />
    </LinearGradient>
  );
};

export default LinearButton;
