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
import Header from '../../../components/Header';
import {AlertHead} from '../../../common/commonString';
import { AddUserStyles } from './index.styles';

const AddUser = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('1234567890');

  const submitData = () => {
    const mobiletrim = mobile.trim();
    const emailtrim = email.trim();
    if (isEmpty(name)) {
      Alert.alert('Name is Required');
      return;
    }
    if (isEmpty(mobiletrim)) {
      Alert.alert('Mobile is Required');
      return;
    }
    if (isEmpty(emailtrim)) {
      Alert.alert('Email is Required');
      return;
    }
    let bodyObj = {
      name: name,
      mobile: mobiletrim,
      email: emailtrim,
      password: password,
    };
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        AddFirebaseAccount(bodyObj);
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const AddFirebaseAccount = data => {
    firebaseSvc
      .createAccount(data)
      .then(async res => {
        Alert.alert(AlertHead, 'User added successfully');
        setName('');
        setMobile('');
        setEmail('');
        props.navigation.replace('Users');
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert(AlertHead, 'Something went wrong');
      });
  };
  const styles = AddUserStyles();
  return (
    <>
      <Header {...props} text={'Add User'} back={true} />
      <View style={styles.flex}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}>
          <View style={styles.container}>
            <ShowText
              style={styles.appname}
              children={'Add User'}
              variant={'FontBold'}
              bold
            />
            <ShowText
              children={'Please Enter Name'}
              variant={'mediumPlus'}
              bold
            />
            <InputText
              value={name}
              onChangeText={text => {
                setName(text);
              }}
            />
            <ShowText
              children={'Please Enter Mobile'}
              variant={'mediumPlus'}
              bold
            />
            <InputText
              value={mobile}
              onChangeText={text => {
                setMobile(text);
              }}
            />
            <ShowText
              children={'Please Enter Email'}
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
              <LinearButton children={'Add User'} variant={'largePlus'} bold />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Loader loading={isLoading} textshow={'Logging in'} />
    </>
  );
};

export default AddUser;
