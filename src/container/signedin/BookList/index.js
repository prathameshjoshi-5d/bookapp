import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import ShowText from '../../../components/Text';
import firebaseSvc from '../../../config/FirebaseSvc';
import { BookListStyles } from './indexStyles';
import NoData from '../../../components/NoData';

const Home = props => {
  const itemm = props.route.params;

  const [isAdmin, setIsAdmin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  //   const [data, setData] = useState([
  //   {name: 'Martin-Luther-King',image:'https://th.bing.com/th/id/R.4d09b014c0cdf821436b3541f804da55?rik=OH8qT4Rsoa8FxQ&riu=http%3a%2f%2fprodimage.images-bn.com%2fpimages%2f9780313336867_p0_v3_s1200x630.jpg&ehk=nPnz6zHZMubYOGSgY5rvFS%2bEl8YeJSS%2bJxis%2fywNfH4%3d&risl=&pid=ImgRaw&r=0',cat: 'Autobiography'},
  //   {name: 'Gandhi',image:'https://th.bing.com/th/id/R.135710f0d20e35a81756939e6084960d?rik=iXIhug81GY2EkQ&riu=http%3a%2f%2fapnaorg.com%2fbooks%2fenglish%2fgandhi-biography%2fbook%2fpage0001.gif&ehk=L9Pe2W42rGbE6Uak5%2bEbDpt6yJhCpyJulwm0asdsdVA%3d&risl=&pid=ImgRaw&r=0',cat:'Autobiography'},
  //   {name: 'Life’s Amazing Secrets_ How to Find Balance and Purpose in Your Life',image:'https://th.bing.com/th/id/OIP.3bZIHa9ETJGlhDl43lEw2wHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',cat:'Psychology'},
  //   {name: 'Psychology-A-Self-Teaching-Guide-English',image:'https://th.bing.com/th/id/OIP.svcEpNwIXwKQEmEtmhHYGgHaJZ?w=182&h=231&c=7&r=0&o=5&dpr=1.25&pid=1.7',cat:'Psychology'},
  //   {name: 'Think And Grow Rich',image:'https://images-na.ssl-images-amazon.com/images/I/41q9TI-bUDL._SY344_BO1,204,203,200_.jpg',cat:'Finance'},
  //   {name: 'Stock investing for Dummies',image:'https://th.bing.com/th/id/OIP.MfX-1lOUJIeRJ3P5dfgDtgHaJ4?w=182&h=243&c=7&r=0&o=5&dpr=1.25&pid=1.7',cat:'Finance'},
  // ]);
  const [data, setData] = useState([]);

  const getAllBooks = async () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setIsLoading(true);
        fetchBookList();
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const fetchBookList = () => {
    firebaseSvc
      .onFindAllBooksList(itemm)
      .then(async res => {
        setData(res);
        // console.log('All Book', data);
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
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BookDetails', item)}>
          <View style={styles.bookview}>
            {item.image.includes("http") ?
              <Image
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />
              :
              <Image
                style={styles.image}
                source={{
                  uri:
                    item.image != ''
                      ? `data:image/gif;base64,${item.image}`
                      : 'https://imgur.com/MBgwziw.png',
                }}
              />
            }
            <View style={styles.textview}>
              <ShowText children={item.name} style={styles.text} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = BookListStyles();
  return (
    <>
      <Header {...props} text={'Book List'} back={true} />
      <View style={styles.flex}>
        <View style={styles.container}>
          <ShowText children={'Select Book'} style={styles.head} />
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
          onPress={() => props.navigation.navigate('AddBook', itemm)}>
          <Image
            style={styles.plusImg}
            source={require('../../../assets/images/plus.png')} />
        </TouchableOpacity>
}
      </View>
      <Loader loading={isLoading} textshow={'Fetching Data'} />
    </>
  );
};

export default Home;
