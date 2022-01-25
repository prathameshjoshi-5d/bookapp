import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import ShowText from '../../../components/Text';
import {AlertHead} from '../../../common/commonString';
import { AdminDashboardStyle } from './index.styles';

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
