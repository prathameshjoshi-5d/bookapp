import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import { InputTextStyles } from './index.styles';

const InputText = props => {
  const styles = InputTextStyles();
  return (
    <View>
      <TextInput
        style={styles.input}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry || false}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
      />
    </View>
  );
};

export default InputText;
