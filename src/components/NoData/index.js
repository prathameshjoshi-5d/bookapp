import React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native'
import ShowText from '../Text';
import { NoDataStyles } from './indexStyles';

const NoData = (props) => {
    const styles = NoDataStyles()
    return (
        <View>
            <ShowText
                children={'No Data Avilable!!!'}
                variant={'largePlus'}
                style={styles.nodatatext}
            />
        </View>
    )
}

export default NoData;