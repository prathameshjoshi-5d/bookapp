import React from 'react';
import {View,Text} from 'react-native';
import {fontStyles} from '../../common/font';

const ShowText = props => {
  const commonStyles = fontStyles();
  return (
    <View>
      <Text
        style={[
          commonStyles[props.variant],
          props.textColor
            ? {...props.style, color: props.textColor}
            : {...props.style},
          props.bold && commonStyles.boldFont,
        ]}>
        {props.children}
      </Text>
    </View>
  );
};

export default ShowText;
