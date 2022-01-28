import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
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
import {DashboardStyle} from './index.styles';
import Container from '../../../components/MainView';
import ShowFlashMessage from '../../../common/ShowFlashMessage';

const Dashboard = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');
  const [data, setData] = useState([]);
  const [bookData, setBookData] = useState([]);

  // const bookData = useSelector(state => state.auth.openBooks);

  const getAllBooks = async () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        fetchCategories();
      } else {
        ShowFlashMessage('Please check your internet connection !!!');
      }
    });
  };

  const fetchCategories = () => {
    firebaseSvc
      .onFindBooksCategories()
      .then(async res => {
        setData(res);
        AsyncStorage.getItem('bookOpen')
          .then(async res => {
            setBookData(JSON.parse(res));
          })
          .finally(() => {
            setIsLoading(false);
          });
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
    getAllBooks();
    AsyncStorage.getItem('IsAdmin').then(async res => {
      setIsAdmin(res);
    });
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
          onPress={() =>
            props.navigation.navigate('BookDetails', {
              item: item,
              Dashboard: true,
            })
          }>
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
              <ShowText
                children={item.name}
                variant={'mediumPlus'}
                bold
                style={styles.text}
              />
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
      <Container>
        <ScrollView>
          <View style={styles.container}>
            <ShowText
              children={'Select Category'}
              variant={'FontBold'}
              style={styles.head}
            />
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
            {bookData != null && bookData.length != 0 && (
              <>
                <ShowText
                  children={'Books you are reading'}
                  variant={'FontBold'}
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
        </ScrollView>
        {isAdmin != 'null' && <FAB props={props} screen={'AddCategory'} />}
      </Container>
      <Loader loading={isLoading} />
    </>
  );
};

export default Dashboard;
