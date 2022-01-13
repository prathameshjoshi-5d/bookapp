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
import {UsersStyle} from './indexStyles';
import NoData from '../../../components/NoData';
import {AlertHead} from '../../../common/text';

const Users = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setIsLoading(true);
        fetchUsers();
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const fetchUsers = () => {
    firebaseSvc
      .onGetAllUsers()
      .then(async res => {
        setData(res._docs);
        // console.log('All Users',res._docs );
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch(err => {
        console.log('Firebase ERR', err);
        Alert.alert(AlertHead, 'Something went wrong');
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  React.useEffect(() => {
    getAllUsers();
    AsyncStorage.getItem('IsAdmin').then(async res => {
      console.log('admin', res);
      setIsAdmin(res);
    });
    // AsyncStorage.removeItem('FirebaseUser')
    // .finally(() => {
    //     props.navigation.replace('Login');
    // });
  }, []);

  const renderItem = (item, index) => {
    return (
      <View key={item}>
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <View style={styles.listingview}>
            <ShowText
              children={item._data.name}
              variant={'large'}
              style={styles.name}
            />
            <ShowText
              children={item._data.email}
              variant={'medium'}
              style={styles.email}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = UsersStyle();
  return (
    <>
      <Header {...props} text={'Users'} back={true} />
      <View style={styles.flex}>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            ListEmptyComponent={<NoData />}
            contentContainerStyle={{paddingBottom: 30}}
            onRefresh={() => {
              setIsRefreshing(true);
              getAllUsers();
            }}
            refreshing={isRefreshing}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => props.navigation.navigate('AddUser')}>
          <Image
            style={styles.plusImg}
            source={require('../../../assets/images/plus.png')}
          />
        </TouchableOpacity>
      </View>
      <Loader loading={isLoading} />
    </>
  );
};

export default Users;
