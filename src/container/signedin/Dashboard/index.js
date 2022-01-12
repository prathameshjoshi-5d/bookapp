import React, { useState } from 'react';
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
import { DashboardStyle } from './indexStyle';
import NoData from '../../../components/NoData';

const Dashboard = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');
  const [data, setData] = useState([]);

  const getAllBooks = async () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setIsLoading(true);
        fetchCategories();
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const fetchCategories = () => {
    firebaseSvc
      .onFindBooksCategories()
      .then(async res => {
        setData(res);
        // console.log('All Book',res );
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch(err => {
        console.log('Firebase ERR', err);
        Alert.alert('Book Store App', 'Something went wrong');
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  //   const updatePassword = async () => {
  //     setIsLoading(true);
  //     firebaseSvc
  //       .onUpdatePassword()
  //       .then(async res => {
  //         // setData(res);
  //         console.log('password updated',res );
  //         setIsLoading(false);
  //       })
  //       .catch(err => {
  //         console.log('Firebase ERR', err);
  //       });
  //   };

  React.useEffect(() => {
    getAllBooks();
    AsyncStorage.getItem('IsAdmin')
      .then(async (res) => {
        console.log('admin', res)
        setIsAdmin(res)
      })
    // AsyncStorage.removeItem('FirebaseUser')
    // .finally(() => {
    //     props.navigation.replace('Login');
    // });
  }, []);

  const renderItem = (item, index) => {
    return (
      <View key={item}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BookList', item)}>
          <View style={styles.listingview}>
            <ShowText children={item} variant={'large'} style={styles.text} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = DashboardStyle();
  return (
    <>
      <Header {...props} text={'Book Store App'} back={isAdmin != 'null'? true: false} />
      {/* <View style={{width:'50%',alignSelf:'flex-end'}}>
          <Button
            title="Change Password"
            onPress={() => props.navigation.navigate('ChangePassword')}
          />
        </View> */}
      <View style={styles.flex}>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            ListEmptyComponent={<NoData />}
            contentContainerStyle={{ paddingBottom: 30 }}
            onRefresh={() => {
              setIsRefreshing(true);
              getAllBooks();
            }}
            refreshing={isRefreshing}
          />
        </View>
        {isAdmin != 'null' &&
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => props.navigation.navigate('AddCategory')}>
            <Image
              style={styles.plusImg}
              source={require('../../../assets/images/plus.png')} />
          </TouchableOpacity>
        }
      </View>
      <Loader loading={isLoading} />
    </>
  );
};

export default Dashboard;
