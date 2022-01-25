import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
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
import NoData from '../../../components/NoData';
import {AlertHead} from '../../../common/commonString';
import FAB from '../../../components/FAB';
import { BookListStyles } from './index.styles';

const Home = props => {
  const itemm = props.route.params;

  const [isAdmin, setIsAdmin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const getAllBooks = async () => {
    NetInfo.fetch().then(state => {
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
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch(err => {
        Alert.alert(AlertHead, 'Something went wrong');
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  React.useEffect(() => {
    getAllBooks();
    AsyncStorage.getItem('IsAdmin').then(async res => {
      setIsAdmin(res);
    });
  }, []);

  const renderItem = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BookDetails', {item: item,Dashboard: false})}>
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
      <Header {...props} text={'Book List'} backDashboard={true} />
      <View style={styles.flex}>
        <View style={styles.container}>
          <ShowText children={'Select Book'} style={styles.head} />
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
        </View>
        {isAdmin != 'null' && (
          <FAB />
        )}
      </View>
      <Loader loading={isLoading} textshow={'Fetching Data'} />
    </>
  );
};

export default Home;
