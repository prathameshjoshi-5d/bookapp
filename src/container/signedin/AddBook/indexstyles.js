import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import color from '../../../common/color';
import { REGULAR } from '../../../common/font';

export const AddBookStyles = () => {
  return StyleSheet.create({
    flex: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1.5,
      marginVertical: 5,
      height: 44,
      fontFamily: REGULAR,
      fontSize: 15,
      borderColor: '#CCCCCC',
      backgroundColor: color.TextColorWhite,
      borderRadius: 5,
      color: color.TextColorBlack,
    },
    container: {
      marginHorizontal: 15,
    },
    head: {
      textAlign: 'center',
      fontSize: 26,
      marginTop: 5,
      marginBottom: 30,
    },
    buttonStyle: {
      alignItems: "center",
      backgroundColor: "orange",
      padding: 10,
      width: 300,
      marginVertical: 16,
    },
    buttonTextStyle: {
      color: "white",
      fontWeight: "bold",
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
      // margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      width: Dimensions.get('screen').width - 30,
      // alignItems: "center",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      // elevation: 2,
      // marginHorizontal:20,
      marginBottom: 5,
    },
    button1: {
      borderRadius: 20,
      padding: 10,
      // elevation: 2,
      // marginHorizontal:20,
      marginBottom: 5,
      alignSelf: 'flex-end',
    },
    buttonOpen: {
      // backgroundColor: "#3BA749",
    },
    buttonClose: {
      // backgroundColor: "#3BA749",
    },
    textStyle: {
      color: 'black',
      // fontWeight: "bold",
      // textAlign: "center"
    },
    modalText: {
      marginBottom: 25,
      // marginLeft:20,
      fontWeight: 'bold',
      // textAlign: "center"
    },
    image: {
      height: Dimensions.get('screen').height / 3,
    },
    camera: {
      // marginTop:-120,
      position: 'absolute',
      // flex:0.35,
      // height:67,
      // width:67,
      // marginLeft:-30,
      // marginRight: 0,
      right: Dimensions.DEVICE_HEIGHT < 680 ? -9 : -5,
      // top: -5
      alignSelf: 'flex-end',
    },
    error: {
      fontSize: 14,
      color: 'red',
      fontFamily: REGULAR
    },
  });
};
