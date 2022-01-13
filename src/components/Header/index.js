import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Image, View, Text, Platform, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {HeaderStyles} from './indexStyle';
import {AlertHead} from '../../common/text';

const Header = props => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {}, [
    AsyncStorage.getItem('IsAdmin').then(async res => {
      // console.log('admin', res);
      setIsAdmin(res);
    }),
  ]);
  const Logout = () => {
    Alert.alert(AlertHead, 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => {},
        // style: "cancel"
      },
      {
        text: 'Yes',
        onPress: () => {
          auth()
            .signOut()
            .then(() =>
              AsyncStorage.removeItem('FirebaseUser').finally(() => {
                props.navigation.replace('Login');
              }),
            )
            .catch(error => {
              console.log('An error happened when signing out', error);
            });
        },
      },
    ]);
  };
  const styles = HeaderStyles();
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.view}>
          {props.back && (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text
                style={[styles.textback, {textDecorationLine: 'underline'}]}>
                {'<'} Back
              </Text>
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row'}}>
            {props.back ? (
              <Text style={styles.text}>{props.text}</Text>
            ) : (
              <Text style={[styles.text, {marginLeft: 25}]}>{props.text}</Text>
            )}
          </View>
          {!props.profile ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ChangePassword')}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={styles.profile}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => Logout()}>
              <Text style={styles.textl}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;
