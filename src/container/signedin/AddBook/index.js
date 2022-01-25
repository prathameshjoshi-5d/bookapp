import * as yup from 'yup';
import {Formik} from 'formik';

import React, {useEffect, useState} from 'react';
import {
  Text,
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
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
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
import {AlertHead} from '../../../common/commonString';
import { AddBookStyles } from './index.styles';

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
  const [permissionGrantedCamera, setPermissionGrantedCamera] = useState(false);

  useEffect(() => {
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            break;
          case RESULTS.GRANTED:
            setPermissionGranted(true);
            break;
          case RESULTS.BLOCKED:
            break;
        }
      })
      .catch(err => {
      });
    check(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            break;
          case RESULTS.GRANTED:
            setPermissionGrantedCamera(true);
            break;
          case RESULTS.BLOCKED:
            break;
        }
      })
      .catch(err => {
      });
  });

  const addBook = values => {
    if (isEmpty(image)) {
      Alert.alert(AlertHead, 'Please select image');
    }
    if (isEmpty(file)) {
      Alert.alert(AlertHead, 'Please select file');
    }
    NetInfo.fetch().then(state => {
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
  };

  const moveToDeviceSettings = () => {
    let messg = '';
    if (Platform.OS == 'android') {
      messg = 'Please enable storage and camera permission from Settings';
    } else messg = 'Please enable camera permissions from Settings';

    Platform;
    Alert.alert(AlertHead, messg, [
      {
        text: 'OK',
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
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
            break;
          case RESULTS.DENIED:
            Platform.OS === 'ios'
              ? requestIOSPermission()
              : requestAndroidPermission();
            break;
          case RESULTS.GRANTED:
            setPermissionGranted(true);
            break;
          case RESULTS.BLOCKED:
            moveToDeviceSettings();
            break;
        }
      })
      .catch(err => {
      });
  };

  const requestIOSPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            break;
          case RESULTS.GRANTED:
            getCurrentLocation(true);
            break;
          case RESULTS.BLOCKED:
            moveToDeviceSettings();
            break;
        }
      })
      .catch(err => {
      });
  };

  const requestAndroidPermission = () => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            setPermissionGranted(false);
            break;
          case RESULTS.DENIED:
            setPermissionGranted(false);
            break;
          case RESULTS.GRANTED:
            setPermissionGranted(true);
            break;
          case RESULTS.BLOCKED:
            setPermissionGranted(false);
            break;
        }
      })
      .catch(err => {
      });
  };

  const checkPermissionCamera = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            Platform.OS === 'ios'
              ? requestIOSPermission()
              : requestAndroidCameraPermission();
            break;
          case RESULTS.GRANTED:
            setPermissionGrantedCamera(true);
            break;
          case RESULTS.BLOCKED:
            moveToDeviceSettings();
            break;
        }
      })
      .catch(err => {
      });
  };

  const requestAndroidCameraPermission = () => {
    request(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            setPermissionGrantedCamera(false);
            break;
          case RESULTS.DENIED:
            setPermissionGrantedCamera(false);
            break;
          case RESULTS.GRANTED:
            setPermissionGrantedCamera(true);
            break;
          case RESULTS.BLOCKED:
            setPermissionGrantedCamera(false);
            break;
        }
      })
      .catch(err => {
      });
  };

  const chooseFileCamera = async image => {
    // Check for Storage Permission
    checkPermissionCamera();
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

      if (response.didCancel) {
        moveToDeviceSettings();
      } else if (response.errorCode) {
        moveToDeviceSettings();
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
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

        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
          alert(response.customButton);
        } else {
          const source = {uri: response.uri};
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
    await checkPermission();
    if (permissionGranted) {
      // Opening Document Picker to select one file
      try {
        const fileDetails = await DocumentPicker.pick({
          // Provide which type of file you want user to pick
          type: [DocumentPicker.types.pdf],
        });
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
      const documentUri = await getPathForFirebaseStorage(filePath[0].uri);
      const storageRef = storage().ref();
      await storageRef
        .child(`/${itemm}/${filePath[0].name}`)
        .putFile(documentUri)
        .then(snapshot => {
          Alert.alert(AlertHead, 'File Uploaded Successfully');
          let reference = storage().ref(`/${itemm}/${filePath[0].name}`);
          var sampleImage = reference.getDownloadURL().then(function (url) {
            setFile(url);
            setFileName(filePath[0].name);
          });
        })
        .catch(e => {});
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
      // });
      // task.then(() => {
      //   alert('Image uploaded to the bucket!');
      //   setProcess('');
      // });
      setFilePath({});
    } catch (error) {
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
