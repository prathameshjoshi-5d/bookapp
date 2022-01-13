import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {FABStyle} from './indexStyle';

const FAB = props => {
  const styles = FABStyle();
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => props.navigation.navigate('AddBook')}>
      <Image
        style={styles.plusImg}
        source={require('../../assets/images/plus.png')}></Image>
    </TouchableOpacity>
  );
};

export default InputText;
