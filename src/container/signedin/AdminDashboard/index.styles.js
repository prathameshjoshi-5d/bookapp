import {StyleSheet, Platform, Dimensions} from 'react-native';
import color from '../../../common/color';

export const AdminDashboardStyle = () => {
  return StyleSheet.create({
    flex: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    container: {
      marginHorizontal: 15,
    },
    listingview: {
      marginTop: 10,
      backgroundColor: 'lightgrey',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
    },
    text: {
      padding: 10,
      color: color.textColorBlack,
    },
    addButton: {
      right: 20,
      position: 'absolute',
      bottom: 20,
    },
    plusImg: {
      width: 60,
      height: 60,
    },
    option: {
      marginTop: 10,
      backgroundColor: 'lightgrey',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      alignItems: 'center',
      width: '50%',
    },
    row: {
      width: '100%',
      flexDirection: 'row',
    },
    head: {
      textAlign: 'center',
      fontSize: 26,
      marginTop: 5,
      marginBottom: 30,
    },
  });
};
