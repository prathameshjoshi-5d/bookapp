import * as yup from 'yup';
import {Formik} from 'formik';

import React, {useState} from 'react';
import {
  TextInput,
  Text,
  Button,
  Alert,
  View,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
// Firebase Storage to upload file
import storage from '@react-native-firebase/storage';
// To pick the file from local file system
import DocumentPicker from 'react-native-document-picker';
import Header from '../../../components/Header';
import LinearButton from '../../../components/LinearButton';
import Loader from '../../../components/Loader';
import ShowText from '../../../components/Text';
import InputText from '../../../components/TextInput';
import firebaseSvc from '../../../config/FirebaseSvc';
import isEmpty from '../../../validation/isEmpty';
import {AddBookStyles} from './indexstyles';

const AddBookSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  Author: yup.string().required('Author is required'),
});

const AddBook = props => {
  const itemm = props.route.params;

  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [process, setProcess] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  const addBook = values => {
    if (isEmpty(image)) {
      Alert.alert('Book Store App', 'Please select image');
    }
    if (isEmpty(file)) {
      Alert.alert('Book Store App', 'Please select file');
    }
    console.log('Connection type', values);
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setLoading(true);
        BookAdd(values);
      } else {
        Alert.alert('Please check your internet connection !!!');
      }
    });
  };

  const BookAdd = data => {
    const book = {
      name: data.name,
      Author: data.Author,
      file: file,
      image: image,
    };
    firebaseSvc.onAddBook(itemm, book);

    setLoading(false);
    props.navigation.replace('Home');
    // .then(async res => {
    //     console.log('Add Firebase Account', res);
    //     Alert.alert('Book Store App', 'User added successfully');
    // })
    // .catch(err => {
    //     console.log('Firebase ERR', err);
    //     Alert.alert(
    //         'Book Store App',
    //         'Something went wrong',
    //     );
    // });
  };

  const moveToDeviceSettings = () => {
    let messg = '';
    if (Platform.OS == 'android') {
      messg = 'Please enable storage and camera permission from Settings';
    } else messg = 'Please enable camera permissions from Settings';

    Platform;
    Alert.alert('Book Store App', messg, [
      {
        text: 'OK',
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel pressed');
        },
      },
    ]);
  };

  const checkPermission = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available');
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            Platform.OS === 'ios'
              ? requestIOSPermission()
              : requestAndroidPermission();
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            setPermissionGranted(true);
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            moveToDeviceSettings();
            break;
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const requestIOSPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available');
            break;
          case RESULTS.DENIED:
            console.log('The permission has been denied');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getCurrentLocation(true);
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            moveToDeviceSettings();
            break;
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const requestAndroidPermission = () => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available');
            setPermissionGranted(false);
            break;
          case RESULTS.DENIED:
            console.log('The permission has been denied');
            setPermissionGranted(false);
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            setPermissionGranted(true);
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            setPermissionGranted(false);
            break;
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const chooseFileCamera = async image => {
    var options = {
      //noData: true,
      title: 'Select Image',
      maxWidth: 300,
      maxHeight: 300,
      customButtons: [
        {
          name: 'customOptionKey',
          title: '',
        },
      ],
      storageOptions: {
        path: 'images',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        moveToDeviceSettings();
      } else if (response.errorCode) {
        console.log('LaunchCamera Error: ', response.errorCode);
        moveToDeviceSettings();
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response of image', console.log(response));
        setImage(response.base64);
      }
      setModalVisible(false);
    });
  };
  const chooseFileGallery = async image => {
    var options = {
      //noData: true,
      title: 'Select Image',
      maxWidth: 300,
      maxHeight: 300,
      customButtons: [
        {
          name: 'customOptionKey',
          title: '',
        },
      ],
      storageOptions: {
        path: 'images',
        skipBackup: true,
      },
      includeBase64: true,
    };
    // Check for Storage Permission
    checkPermission();
    if (permissionGranted) {
      launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = {uri: response.uri};
          console.log('launchImageLibrary', response.base64);
          setImage(response.base64);
        }
        setModalVisible(false);
      });
    }
  };

  getPathForFirebaseStorage = async uri => {
    if (Platform.OS === 'ios') {
      return uri;
    }
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  };

  const _chooseFile = async () => {
    // Check for Storage Permission
    checkPermission();
    if (permissionGranted) {
      // Opening Document Picker to select one file
      try {
        const fileDetails = await DocumentPicker.pick({
          // Provide which type of file you want user to pick
          type: [DocumentPicker.types.pdf],
        });
        console.log('fileDetails : ' + JSON.stringify(fileDetails));
        // Setting the state for selected File
        setFilePath(fileDetails);
        setLoading(true);
        _uploadFile(fileDetails);
      } catch (error) {
        setFilePath({});
        // If user canceled the document selection
        // alert(
        //   DocumentPicker.isCancel(error)
        //     ? 'Canceled'
        //     : 'Unknown Error: ' + JSON.stringify(error),
        // );
      }
    }
  };

  const _uploadFile = async filePath => {
    try {
      // Check if file selected
      // if (Object.keys(filePath).length == 0)
      //   return alert('Please Select any File');
      setLoading(true);

      // Create Reference
      console.log('fileDetails to send : ' + JSON.stringify(filePath[0]));
      console.log(filePath[0].uri.replace('file://', ''));
      console.log(filePath[0].name);
      const documentUri = await getPathForFirebaseStorage(filePath[0].uri);
      console.log(documentUri);
      const storageRef = storage().ref();
      await storageRef
        .child(`/${itemm}/${filePath[0].name}`)
        .putFile(documentUri)
        .then(snapshot => {
          console.log('has been successfully uploaded.', snapshot);
          Alert.alert('Book Store App', 'File Uploaded Successfully');
          let reference = storage().ref(`/${itemm}/${filePath[0].name}`);
          var sampleImage = reference.getDownloadURL().then(function (url) {
            console.log('url', url);
            setFile(url);
            setFileName(filePath[0].name);
          });
        })
        .catch(e => console.log('uploading image error => ', e));
      // const reference = storage().ref(`/myfiles/${filePath[0].name}`);

      // Put File
      // const task = reference.putFile(filePath[0].uri.replace('file://', ''));
      // You can do different operation with task
      // task.pause();
      // task.resume();
      // task.cancel();

      // task.on('state_changed', taskSnapshot => {
      //   setProcess(
      //     `${taskSnapshot.bytesTransferred} transferred
      //      out of ${taskSnapshot.totalBytes}`,
      //   );
      //   console.log(
      //     `${taskSnapshot.bytesTransferred} transferred
      //      out of ${taskSnapshot.totalBytes}`,
      //   );
      // });
      // task.then(() => {
      //   alert('Image uploaded to the bucket!');
      //   setProcess('');
      // });
      setFilePath({});
    } catch (error) {
      console.log('Error->', error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
  };

  const styles = AddBookStyles();
  return (
    <Formik
      initialValues={{name: '', Author: ''}}
      // validateOnMount
      onSubmit={values => addBook(values)}
      validationSchema={AddBookSchema}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <>
          <Header {...props} text={'Add Book'} back={true} p />
          <View style={styles.flex}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              scrollEnabled={true}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    image != ''
                      ? `data:image/gif;base64,${image}`
                      : 'https://imgur.com/MBgwziw.png',
                }}
              />
              <TouchableOpacity
                style={styles.camera}
                onPress={() => setModalVisible(true)}>
                <Image source={require('../../../assets/images/camera.png')} />
              </TouchableOpacity>
              <View style={styles.container}>
                <ShowText
                  children={'Please Enter Book Name'}
                  variant={'MediumPlus'}
                  bold
                />
                <InputText
                  style={styles.input}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
                {touched.name && errors.name && (
                  <ShowText
                    children={errors.name}
                    variant={'medium'}
                    style={styles.error}
                  />
                )}
                <ShowText
                  children={'Please Enter Author'}
                  variant={'MediumPlus'}
                  bold
                />
                <InputText
                  style={styles.input}
                  value={values.Author}
                  onChangeText={handleChange('Author')}
                  onBlur={() => setFieldTouched('Author')}
                />
                {touched.Author && errors.Author && (
                  <ShowText
                    children={errors.Author}
                    variant={'medium'}
                    style={styles.error}
                  />
                )}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyle}
                  onPress={() => _chooseFile()}>
                  <ShowText
                    children={fileName == '' ? 'Choose File' : fileName}
                    variant={'medium'}
                    style={styles.buttonTextStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{marginTop: 20}}>
                  <LinearButton children={'Add Book'} variant={'largePlus'} />
                </TouchableOpacity>
                {/* <Text>{process}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyle}
                  onPress={() => _chooseFile()}>
                  <Text style={styles.buttonTextStyle}>
                    Choose Image (Current Selected:{' '}
                    {Object.keys(filePath).length == 0 ? 0 : 1})
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => _uploadFile()}>
                  <Text style={styles.buttonTextStyle}>
                    Upload File on FireStorage
                  </Text>
                </TouchableOpacity> */}
              </View>
            </KeyboardAwareScrollView>
          </View>
          <Loader loading={loading} textshow={'Adding Book'} />
          {modalVisible ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Please Select Option</Text>
                  <View style={{justifyContent: 'flex-start'}}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => chooseFileCamera()}>
                      <Text style={styles.textStyle}>Take Photo...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => chooseFileGallery()}>
                      <Text style={styles.textStyle}>Choose from Gallery</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.button1, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : (
            <></>
          )}
        </>
      )}
    </Formik>
  );
};

export default AddBook;
