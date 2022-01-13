import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import ShowText from '../../../components/Text';
import firebaseSvc from '../../../config/FirebaseSvc';
import {AdminDashboardStyle} from './indexStyles';
import {AlertHead} from '../../../common/text';

const AdminDashboard = props => {
  const styles = AdminDashboardStyle();
  return (
    <>
      <Header {...props} text={AlertHead} />
      <View style={styles.flex}>
        <View style={styles.container}>
          <ShowText
            style={styles.head}
            children={'Welcome Admin'}
            variant={'FontBold'}
            bold
          />
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Users')}
              style={styles.option}>
              <ShowText
                children={'Users'}
                variant={'large'}
                style={styles.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={styles.option}>
              <ShowText
                children={'Categories'}
                variant={'large'}
                style={styles.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default AdminDashboard;
