import React, {useState} from 'react';
import {Image, Button, View, TouchableOpacity, Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import isEmpty from '../../../validation/isEmpty';
import firebaseSvc from '../../../config/FirebaseSvc';
import Loader from '../../../components/Loader';
import {LoginStyles} from './indexStyle';
import InputText from '../../../components/TextInput';
import ShowText from '../../../components/Text';
import color from '../../../common/color';
import LinearButton from '../../../components/LinearButton';
import {AlertHead} from '../../../common/text';

const Login = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitData = () => {
    const emailtrim = email.trim();
    const passwordtrim = password.trim();
    if (isEmpty(emailtrim)) {
      Alert.alert('Email is Required');
      return;
    }
    if (isEmpty(passwordtrim)) {
      Alert.alert('Password is Required');
      return;
    }
    let bodyObj = {
      email: emailtrim,
      password: passwordtrim,
    };
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setIsLoading(true);
        LoginFirebaseAccount(bodyObj);
        setIsLoading(false);
      } else {
        Alert.alert('Please check your internet connection !!!');
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
        console.log('Firebase Login', res);
        await AsyncStorage.setItem(
          'FirebaseUser',
          JSON.stringify(res.user.uid),
        );
        if (res.user.uid === 'YSn9f4uNh6R0pgBIJz10X8ZIFRB3') {
          await AsyncStorage.setItem('IsAdmin', res.user.uid);
          props.navigation.replace('AdminDashboard');
        } else {
          await AsyncStorage.setItem('IsAdmin', 'null');
          props.navigation.replace('Home');
        }
      })
      .catch(err => {
        console.log('Firebase ERR', err);
        Alert.alert(
          AlertHead,
          'Email or Password is incorrect. Please Check!!!',
        );
      });
  };
  const styles = LoginStyles();
  return (
    <>
      <View style={styles.flex}>
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
              style={styles.input}
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
              style={styles.input}
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
      </View>
      <Loader loading={isLoading} textshow={'Logging in'} />
    </>
  );
};

export default Login;
