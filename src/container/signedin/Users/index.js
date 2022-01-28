import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import ShowText from '../../../components/Text';
import firebaseSvc from '../../../config/FirebaseSvc';
import NoData from '../../../components/NoData';
import FAB from '../../../components/FAB';
import {UsersStyle} from './index.styles';
import Container from '../../../components/MainView';
import ShowFlashMessage from '../../../common/ShowFlashMessage';

const Users = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        fetchUsers();
      } else {
        ShowFlashMessage('Please check your internet connection !!!');
      }
    });
  };

  const fetchUsers = () => {
    firebaseSvc
      .onGetAllUsers()
      .then(async res => {
        setData(res._docs);
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch(err => {
        ShowFlashMessage('Something went wrong');
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  React.useEffect(() => {
    getAllUsers();
    AsyncStorage.getItem('IsAdmin').then(async res => {
      setIsAdmin(res);
    });
  }, []);

  const renderItem = (item, index) => {
    return (
      <View key={item}>
        <TouchableOpacity>
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
      <Container>
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
        <FAB props={props} screen={'AddUser'} />
      </Container>
      <Loader loading={isLoading} />
    </>
  );
};

export default Users;
