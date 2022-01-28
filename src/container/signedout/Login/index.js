import React, {useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import isEmpty from '../../../validation/isEmpty';
import firebaseSvc from '../../../config/FirebaseSvc';
import Loader from '../../../components/Loader';
import InputText from '../../../components/TextInput';
import ShowText from '../../../components/Text';
import LinearButton from '../../../components/LinearButton';
import {AlertHead} from '../../../common/commonString';
import {LoginStyles} from './index.style';
import Container from '../../../components/MainView';
import ShowFlashMessage from '../../../common/ShowFlashMessage';

const Login = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitData = () => {
    const emailtrim = email.trim();
    const passwordtrim = password.trim();
    if (isEmpty(emailtrim)) {
      ShowFlashMessage('Email is Required');
      return;
    }
    if (isEmpty(passwordtrim)) {
      ShowFlashMessage('Password is Required');
      return;
    }
    let bodyObj = {
      email: emailtrim,
      password: passwordtrim,
    };
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        LoginFirebaseAccount(bodyObj);
      } else {
        ShowFlashMessage('Please check your internet connection !!!');
      }
    });
  };

  const LoginFirebaseAccount = data => {
    const user = {
      email: data.email,
      password: data.password,
    };
    firebaseSvc
      .login(user)
      .then(async res => {
        await AsyncStorage.setItem(
          'FirebaseUser',
          JSON.stringify(res.user.uid),
        );
        setIsLoading(false);
        if (res.user.uid === 'YSn9f4uNh6R0pgBIJz10X8ZIFRB3') {
          await AsyncStorage.setItem('IsAdmin', res.user.uid);
          props.navigation.replace('AdminDashboard');
        } else {
          await AsyncStorage.setItem('IsAdmin', 'null');
          props.navigation.replace('Home');
        }
      })
      .catch(err => {
        setIsLoading(false);
        ShowFlashMessage('Email or Password is incorrect. Please Check!!!');
      });
  };
  const styles = LoginStyles();
  return (
    <>
      <Container>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}>
          <View style={styles.container}>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={require('../../../assets/images/logo.png')}
              />
            </View>
            <ShowText
              style={styles.appname}
              children={AlertHead}
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
            <ShowText
              children={'Please Enter Your Password'}
              variant={'mediumPlus'}
              bold
            />
            <InputText
              secureTextEntry={true}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <TouchableOpacity
              onPress={() => submitData()}
              style={{marginTop: 20}}>
              <LinearButton children={'Login'} variant={'largePlus'} bold />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.replace('Forgot');
              }}>
              <ShowText
                children={'Forgot Password'}
                style={styles.switchscreen}
                bold
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </Container>
      <Loader loading={isLoading} textshow={'Logging in'} />
    </>
  );
};

export default Login;
