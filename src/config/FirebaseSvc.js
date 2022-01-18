import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendSMS from 'react-native-sms';
import {Alert} from 'react-native';
import {AlertHead} from '../common/commonString';
const bookCollections = firestore().collection('Books');

class FirebaseSvc {
  constructor() {}

  login = async user => {
    let result = null;
    await auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        result = data;
        console.log('Login user successfully.');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert(AlertHead, 'The email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert(AlertHead, 'The email address is invalid!');
        }

        // console.error(error);
      });
    return result;
  };

  createAccount = async user => {
    console.log('Creating in');
    let result = null;
    await auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(async data => {
        result = data;
        let userObj = {
          uid: data.user.uid,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          password: user.password,
        };
        await firestore()
          .collection('Users')
          .doc(data.user.uid)
          .set(userObj) // Change here the object
          .then(res => {
            console.log('user added!', res);
            SendSMS.send(
              {
                body: `Hello ${userObj.name}. Your account has been created for Book Store App with email ${userObj.email} and password ${userObj.password}. Please install app and login. Greetings 5D Solutions.`,
                recipients: [userObj.mobile],
                successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true,
              },
              (completed, cancelled, error) => {
                console.log(
                  'SMS Callback: completed: ' +
                    completed +
                    ' cancelled: ' +
                    cancelled +
                    'error: ' +
                    error,
                );
              },
            );
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    return result;
  };

  onGetAllUsers = async () => {
    const users = await firestore().collection('Users').get();
    return users;
  };

  reauthenticate = currentPassword => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  onUpdatePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(res => {
            console.log('Password updated!', res);
            Alert.alert(AlertHead, 'Password Updated Successfully');
          })
          .catch(error => {
            console.log(error);
            Alert.alert(
              AlertHead,
              'Password Updation failed. Something went wrong !!!',
            );
          });
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          AlertHead,
          'Password Updation failed. Something went wrong !!!',
        );
      });
  };

  onForgotPassword = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(res => {
        Alert.alert(AlertHead, 'Password reset email sent successfully');
      })
      .catch(error => {
        console.log('An error happened when reset password', error);
        Alert.alert(
          AlertHead,
          'Password reset email sent failed. Something went wrong !!!',
        );
      });
  };

  onDeleteUser = uid => {
    auth()
      .deleteUser(uid)
      .then(() => console.log('User Deledted!'))
      .catch(error => {
        console.log('An error happened when deleting user', error);
      });
  };

  onLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => {
        console.log('An error happened when signing out', error);
      });
  };

  onAddCategory = async category => {
    firestore()
      .collection('books')
      .doc(category)
      .set({})
      .then(res => {
        console.log('Category added!', res);
        Alert.alert(AlertHead, 'Category Added successfully');
      })
      .catch(error => {
        console.log('An error happened when adding category', error);
        Alert.alert(
          AlertHead,
          'Category Addition failed. Something went wrong !!!',
        );
      });
  };

  onAddBook = async (category, book) => {
    firestore()
      .collection('Books')
      .doc(category)
      .collection('data')
      .add(book) // Change here the object
      .then(res => {
        console.log('Book added!', res);
        Alert.alert(AlertHead, 'Book Added successfully');
      })
      .catch(error => {
        console.log('An error happened when adding book', error);
        Alert.alert(
          AlertHead,
          'Book Addition failed. Something went wrong !!!',
        );
      });
  };

  // onFindAllBooks = async (item, book) => {
  //   let databook = [];
  //   await bookCollections
  //     .doc(item)
  //     .collection(book)
  //     .get()
  //     .then(data => {
  //       databook = data;
  //     });
  //   return databook;
  // };

  onFindAllBooksList = async item => {
    let categoryArr = [];
    let dataArray = [];
    await bookCollections.get().then(collectionSnapshot => {
      console.log('Total books: ', collectionSnapshot.size);
      collectionSnapshot.forEach(async documentSnapshot => {
        categoryArr.push(documentSnapshot.id);
      });
    });
    console.log({categoryArr});
    await bookCollections
      .doc(item)
      .collection('data')
      .get()
      .then(collection => {
        console.log('collection books: ', collection.size);
        collection.forEach(async documentSnapshot => {
          console.log(
            'document ID: ',
            documentSnapshot.id,
            documentSnapshot.data().name,
          );
          dataArray.push(documentSnapshot.data());
        });
      });
    return dataArray;
  };

  onFindBooksCategories = async () => {
    const categoryArr = [];
    await bookCollections.get().then(collectionSnapshot => {
      // console.log('Total books: ', collectionSnapshot.size);
      collectionSnapshot.forEach(async documentSnapshot => {
        // console.log('books ID: ', documentSnapshot.id, documentSnapshot.data());
        categoryArr.push(documentSnapshot.id);
      });
    });
    return categoryArr;
  };
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
