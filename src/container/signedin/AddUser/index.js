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
import {AddUserStyles} from './index.styles';
import Container from '../../../components/MainView';
import ShowFlashMessage from '../../../common/ShowFlashMessage';

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
      ShowFlashMessage('Name is Required');
      return;
    }
    if (isEmpty(mobiletrim)) {
      ShowFlashMessage('Mobile is Required');
      return;
    }
    if (isEmpty(emailtrim)) {
      ShowFlashMessage('Email is Required');
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
        ShowFlashMessage('Please check your internet connection !!!');
      }
    });
  };

  const AddFirebaseAccount = data => {
    firebaseSvc
      .createAccount(data)
      .then(async res => {
        ShowFlashMessage('User added successfully');
        setName('');
        setMobile('');
        setEmail('');
        props.navigation.replace('Users');
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        ShowFlashMessage('Something went wrong');
      });
  };
  const styles = AddUserStyles();
  return (
    <>
      <Header {...props} text={'Add User'} back={true} />
      <Container>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handlViewed"
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
      </Container>
      <Loader loading={isLoading} textshow={'Adding user'} />
    </>
  );
};

export default AddUser;
