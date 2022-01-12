import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {LoaderStyle} from './indexStyle';

const Loader = props => {
  const {loading, textshow} = props;
  const styles = LoaderStyle();
  if (loading) {
    return (
      <View style={styles.viewOne}>
        <View style={styles.viewTwo}>
          <ActivityIndicator size="large" color="#777777" />
          <Text style={[styles.text]}>
            {textshow ? textshow : 'Please wait... ' + ' '}
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default Loader;
