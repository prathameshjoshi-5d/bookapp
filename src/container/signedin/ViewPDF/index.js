import React from 'react';
import {StyleSheet, Dimensions, View, Alert} from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../../../components/Header';
import { ViewPDFStyles } from './indexStyles';

const ViewPDF = props => {
  const item = props.route.params;
  const source = {uri: item, cache: true};
  const styles = ViewPDFStyles();
  return (
    <>
      <Header {...props} back={true} />
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
            Alert.alert('Book Store App','Book is not available')
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </>
  );
};

export default ViewPDF;
