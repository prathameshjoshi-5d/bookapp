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
import { ChangePasswordStyles } from './index.styles';

const ChangePassword = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePassword = async () => {
    const passwordtrim = password.trim();
    const confirmpasswordtrim = confirmPassword.trim();
    if (isEmpty(passwordtrim)) {
      Alert.alert('Current Password is Required');
      return;
    }
    if (isEmpty(confirmpasswordtrim)) {
      Alert.alert('New Password is Required');
      return;
    }
    let bodyObj = {
      password: passwordtrim,
      confirmPassword: confirmpasswordtrim,
    };
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        changePass(bodyObj);
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const changePass = data => {
    firebaseSvc.onUpdatePassword(data.password, data.confirmPassword);
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
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
              }}
            />
            <TouchableOpacity
              onPress={() => updatePassword()}
              style={{marginTop: 20}}>
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
