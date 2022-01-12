import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import Header from '../../../components/Header';
import LinearButton from '../../../components/LinearButton';
import Loader from '../../../components/Loader';
import ShowText from '../../../components/Text';
import InputText from '../../../components/TextInput';
import firebaseSvc from '../../../config/FirebaseSvc';
import isEmpty from '../../../validation/isEmpty';
import { ChangePasswordStyles } from './indexStyles';

const ChangePassword = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePassword = async () => {
    if (isEmpty(password)) {
      Alert.alert('Current Password is Required');
      return;
    }
    if (isEmpty(confirmPassword)) {
      Alert.alert('New Password is Required');
      return;
    }
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setIsLoading(true);
        changePass();
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const changePass = () => {
    firebaseSvc.onUpdatePassword(password, confirmPassword);
    setIsLoading(false);
  };

  const styles = ChangePasswordStyles();
  return (
    <>
      <Header {...props} text={'Change Password'} back={true} profile={true} />
      <View style={styles.flex}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}>
          <View style={styles.container}>
            <ShowText
              style={styles.head}
              children={'Change Password'}
              variant={'FontBold'}
              bold
            />
            <ShowText
              children={'Please Enter Current Password'}
              variant={'MediumPlus'}
              bold
            />
            <InputText
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <ShowText
              children={'Please Enter New Password'}
              variant={'MediumPlus'}
              bold
            />
            <InputText
              style={styles.input}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
              }}
            />
            <TouchableOpacity onPress={() => updatePassword()} style={{marginTop:20}}>
              <LinearButton
                children={'Change Password'}
                variant={'largePlus'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Loader loading={isLoading} textshow={'Changing Password'} />
    </>
  );
};

export default ChangePassword;
