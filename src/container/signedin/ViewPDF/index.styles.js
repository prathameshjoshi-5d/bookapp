import {Dimensions, StyleSheet} from 'react-native';

export const ViewPDFStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
};
