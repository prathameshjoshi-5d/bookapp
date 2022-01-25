import React, {useState} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import isEmpty from '../../../validation/isEmpty';
import firebaseSvc from '../../../config/FirebaseSvc';
import Loader from '../../../components/Loader';
import InputText from '../../../components/TextInput';
import ShowText from '../../../components/Text';
import LinearButton from '../../../components/LinearButton';
import { ForgotPasswordStyles } from './index.styles';

const ForgotPassword = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const submitData = () => {
    const emailtrim = email.trim();
    if (isEmpty(emailtrim)) {
      Alert.alert('Email is Required');
      return;
    }
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        forgotaccountpassword(emailtrim);
        setIsLoading(false);
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const forgotaccountpassword = mail => {
    firebaseSvc.onForgotPassword(mail);
  };
  const styles = ForgotPasswordStyles();
  return (
    <>
      <View style={styles.flex}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}>
          <View style={styles.container}>
            <ShowText
              style={styles.appname}
              children={'Forgot Password'}
              variant={'FontBold'}
              bold
            />
            <ShowText
              children={'Please Enter Your Email'}
              variant={'mediumPlus'}
              bold
            />
            <InputText
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <TouchableOpacity
              onPress={() => submitData()}
              style={{marginTop: 20}}>
              <LinearButton
                children={'Forgot Password'}
                variant={'largePlus'}
                bold
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.replace('Login');
              }}>
              <ShowText
                children={'Back to Login'}
                style={styles.switchscreen}
                bold
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Loader loading={isLoading} textshow={'Sending Email'} />
    </>
  );
};

export default ForgotPassword;
