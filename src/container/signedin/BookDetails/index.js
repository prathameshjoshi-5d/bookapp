import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import Header from '../../../components/Header';
import ShowText from '../../../components/Text';
import {BookDetailsStyle} from './index.styles';

const BookDetails = props => {
  const data = props.route.params.item;
  const dashboard = props.route.params.Dashboard;

  React.useEffect(() => {
  }, []);
  const styles = BookDetailsStyle();
  return (
    <>
      {dashboard ? (
        <Header {...props} backDashboard={true} />
      ) : (
        <Header {...props} back={true} />
      )}
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
            onPress={() => props.navigation.navigate('Viewpdf', data)}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default BookDetails;
