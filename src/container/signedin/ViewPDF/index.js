import React, {useState} from 'react';
import {StyleSheet, Dimensions, View, Alert} from 'react-native';
import Pdf from 'react-native-pdf';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AlertHead} from '../../../common/text';
import Header from '../../../components/Header';
import {ViewPDFStyles} from './indexStyles';

const ViewPDF = props => {
  const item = props.route.params;
  const source = {uri: item.file, cache: true};

  const [bookArray, setBookArray] = useState(
    useSelector(state => state.auth.openBooks),
  );
  const styles = ViewPDFStyles();

  const dispatch = useDispatch();

  const setPage = async () => {
    dispatch({type: 'SET_DATA', payload: bookArray});
    await AsyncStorage.setItem('bookOpen', JSON.stringify(bookArray));
  };

  const addBook = page => {
    var ind = bookArray.findIndex(function (element) {
      return element?.file == item.file;
    });
    if (ind !== -1) {
      bookArray.splice(ind, 1);
      bookArray.push({
        file: item.file,
        name: item.name,
        Author: item.Author,
        image: item.image,
        page: page,
      });
    } else {
      bookArray.push({
        file: item.file,
        name: item.name,
        Author: item.Author,
        image: item.image,
        page: page,
      });
    }
  };

  const removeBook = () => {
    var ind = bookArray.findIndex(function (element) {
      return element?.file == item.file;
    });
    if (ind !== -1) {
      bookArray.splice(ind, 1);
    }

    console.log('book', bookArray);
  };

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
            // console.log(`Current page: ${page}  ${numberOfPages}`);
            // setPage();
            if (page != 1 || page != numberOfPages) {
              addBook(page);
            }
            if (page == 1 || page == numberOfPages) {
              removeBook();
            }
            setPage();
          }}
          onError={error => {
            console.log(error);
            Alert.alert(AlertHead, 'Book is not available');
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          page={item?.page ? item.page : 1}
          style={styles.pdf}
        />
      </View>
    </>
  );
};

export default ViewPDF;
