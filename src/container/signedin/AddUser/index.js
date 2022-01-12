import React, { useState } from 'react';
import { Image, Button, View, TouchableOpacity, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import isEmpty from '../../../validation/isEmpty';
import firebaseSvc from '../../../config/FirebaseSvc';
import Loader from '../../../components/Loader';
import InputText from '../../../components/TextInput';
import ShowText from '../../../components/Text';
import color from '../../../common/color';
import LinearButton from '../../../components/LinearButton';
import { AddUserStyles } from './indexStyles';
import Header from '../../../components/Header';

const AddUser = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('1234567890');

    const submitData = () => {
        if (isEmpty(name)) {
            Alert.alert('Name is Required');
            return;
        }
        if (isEmpty(mobile)) {
            Alert.alert('Mobile is Required');
            return;
        }
        if (isEmpty(email)) {
            Alert.alert('Email is Required');
            return;
        }
        let bodyObj = {
            name: name,
            mobile: mobile,
            email: email,
            password: password,
        };
        NetInfo.fetch().then(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
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
                console.log('Add Firebase Account', res);
                Alert.alert('Book Store App', 'User added successfully');
                setName('')
                setMobile('')
                setEmail('')
                props.navigation.replace('Users')
                setIsLoading(false);
            })
            .catch(err => {
                console.log('Firebase ERR', err);
                setIsLoading(false);
                Alert.alert(
                    'Book Store App',
                    'Something went wrong',
                );
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
                            style={styles.input}
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
                            style={styles.input}
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
                            style={styles.input}
                            value={email}
                            onChangeText={text => {
                                setEmail(text);
                            }}
                        />
                        {/* <ShowText
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
                        /> */}
                        <TouchableOpacity onPress={() => submitData()} style={{marginTop:20}}>
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
