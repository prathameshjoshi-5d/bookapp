import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import Header from '../../../components/Header';
import LinearButton from '../../../components/LinearButton';
import Loader from '../../../components/Loader';
import ShowText from '../../../components/Text';
import InputText from '../../../components/TextInput';
import firebaseSvc from '../../../config/FirebaseSvc';
import isEmpty from '../../../validation/isEmpty';
import { AddCategoryStyles } from './index.styles';

const AddCategory = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');

  const categoryAdd = async () => {
    if (isEmpty(category)) {
      Alert.alert('Category is Required');
      return;
    }
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        addCat();
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const addCat = () => {
    firebaseSvc.onAddCategory(category);
    setIsLoading(false);
  };

  const styles = AddCategoryStyles();
  return (
    <>
      <Header {...props} text={'Add Category'} back={true} />
      <View style={styles.flex}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}>
          <View style={styles.container}>
            <ShowText
              style={styles.head}
              children={'Add Category'}
              variant={'FontBold'}
              bold
            />
            <ShowText
              children={'Please Enter Category'}
              variant={'MediumPlus'}
              bold
            />
            <InputText
              value={category}
              onChangeText={text => {
                setCategory(text);
              }}
            />
            <TouchableOpacity
              onPress={() => categoryAdd()}
              style={{marginTop: 20}}>
              <LinearButton children={'Add'} variant={'largePlus'} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Loader loading={isLoading} textshow={'Adding Category'} />
    </>
  );
};

export default AddCategory;
