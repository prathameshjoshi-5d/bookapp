import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
import Header from '../../../components/Header';
import ShowText from '../../../components/Text';
import {BookDetailsStyle} from './indexStyle';

const BookDetails = props => {
  const data = props.route.params;

  // const [data,setData] = useState({});

  // const getAllBooks = async () => {
  //   // setIsLoading(true);
  //   firebaseSvc
  //     .onFindAllBooks(item.cat,item.name)
  //     .then(async res => {
  //       setData(res._docs[0]._data);
  //       // console.log('All Book',res._docs[0]._data );
  //       // setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.log('Firebase ERR', err);
  //     });
  // };

  React.useEffect(() => {
    // getAllBooks();
    // AsyncStorage.removeItem('FirebaseUser')
    // .finally(() => {
    //     props.navigation.replace('Login');
    // });
  }, []);
  const styles = BookDetailsStyle();
  return (
    <>
      <Header {...props} back={true} />
      <ScrollView style={styles.container}>
        {data.image.includes('http') ? (
          <Image
            style={styles.image}
            source={{
              uri: data.image,
            }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri:
                data.image != ''
                  ? `data:image/gif;base64,${data.image}`
                  : 'https://imgur.com/MBgwziw.png',
            }}
          />
        )}
        <ShowText
          children={data?.name}
          variant={'largePlus'}
          style={styles.name}
        />
        <View style={styles.view}>
          <View style={styles.authorview}>
            <ShowText
              children={'Author :' + '  '}
              variant={'large'}
              style={styles.authortitle}
            />
            <ShowText
              children={data?.Author}
              variant={'largePlus'}
              style={styles.authorname}
            />
          </View>
          <Button
            title="View Book"
            onPress={() => props.navigation.navigate('Viewpdf', data.file)}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default BookDetails;
