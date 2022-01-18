import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import ShowText from '../../../components/Text';
import firebaseSvc from '../../../config/FirebaseSvc';
import {DashboardStyle} from './indexStyle';
import NoData from '../../../components/NoData';
import {AlertHead} from '../../../common/commonString';

const Dashboard = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');
  const [data, setData] = useState([]);
  const [bookData, setBookData] = useState([]);

  // const bookData = useSelector(state => state.auth.openBooks);

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
        AsyncStorage.getItem('bookOpen')
          .then(async res => {
            console.log('boooooks', res);
            setBookData(JSON.parse(res));
          })
          .finally(() => {
            setIsLoading(false);
          });
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
    AsyncStorage.getItem('IsAdmin').then(async res => {
      console.log('admin', res);
      setIsAdmin(res);
    });
    // AsyncStorage.getItem('bookOpen')
    //   .then(async res => {
    //     console.log('boooooks', res);
    //     setBookData(JSON.parse(res));
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
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

  const renderBook = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BookDetails', {item: item,Dashboard: true})}>
          <View style={styles.bookview}>
            {item.image.includes('http') ? (
              <Image
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />
            ) : (
              <Image
                style={styles.image}
                source={{
                  uri:
                    item.image != ''
                      ? `data:image/gif;base64,${item.image}`
                      : 'https://imgur.com/MBgwziw.png',
                }}
              />
            )}
            <View style={styles.textview}>
              <ShowText children={item.name} style={styles.textbook} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = DashboardStyle();
  return (
    <>
      <Header
        {...props}
        text={AlertHead}
        back={isAdmin != 'null' ? true : false}
      />
      {/* <View style={{width:'50%',alignSelf:'flex-end'}}>
          <Button
            title="Change Password"
            onPress={() => props.navigation.navigate('ChangePassword')}
          />
        </View> */}
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <ShowText children={'Select Category'} style={styles.head} />
          <FlatList
            data={data}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            ListEmptyComponent={<NoData />}
            contentContainerStyle={{paddingBottom: 30}}
            onRefresh={() => {
              setIsRefreshing(true);
              getAllBooks();
            }}
            refreshing={isRefreshing}
          />
          {bookData.length != 0 && (
            <>
              <ShowText
                children={'Books you are reading'}
                style={styles.head}
              />
              <FlatList
                data={bookData}
                renderItem={({item, index}) => renderBook(item, index)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                ListEmptyComponent={<NoData />}
                contentContainerStyle={{paddingBottom: 30}}
              />
            </>
          )}
        </View>
        {isAdmin != 'null' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => props.navigation.navigate('AddCategory')}>
            <Image
              style={styles.plusImg}
              source={require('../../../assets/images/plus.png')}
            />
          </TouchableOpacity>
        )}
      </ScrollView>
      <Loader loading={isLoading} />
    </>
  );
};

export default Dashboard;
