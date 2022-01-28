import React from 'react';
import {View} from 'react-native';
import { MainViewStyle } from './index.styles';

const Container = props => {
    const styles = MainViewStyle();
  return (
    <View style={styles.flex}>
      <>{props.children}</>
    </View>
  );
};

export default Container;
