import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { FABStyle } from './index.styles';

const FAB = props => {
  const styles = FABStyle();
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => props.props.navigation.navigate(props.screen)}>
      <Image
        style={styles.plusImg}
        source={require('../../assets/images/plus.png')}></Image>
    </TouchableOpacity>
  );
};

export default FAB;
