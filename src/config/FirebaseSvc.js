import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SendSMS from 'react-native-sms';
import ShowFlashMessage from '../common/ShowFlashMessage';
const bookCollections = firestore().collection('Books');

class FirebaseSvc {
  constructor() {}

  login = async user => {
    let result = null;
    await auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        result = data;
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ShowFlashMessage('The email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          ShowFlashMessage('The email address is invalid!');
        }

        // console.error(error);
      });
    return result;
  };

  createAccount = async user => {
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
            SendSMS.send(
              {
                body: `Hello ${userObj.name}. Your account has been created for Book Store App with email ${userObj.email} and password ${userObj.password}. Please install app and login. Greetings 5D Solutions.`,
                recipients: [userObj.mobile],
                successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true,
              },
              (completed, cancelled, error) => {},
            );
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        }

        if (error.code === 'auth/invalid-email') {
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
            ShowFlashMessage('Password Updated Successfully');
          })
          .catch(error => {
            ShowFlashMessage(
              'Password Updation failed. Something went wrong !!!',
            );
          });
      })
      .catch(error => {
        ShowFlashMessage('Password Updation failed. Something went wrong !!!');
      });
  };

  onForgotPassword = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(res => {
        ShowFlashMessage('Password reset email sent successfully');
      })
      .catch(error => {
        ShowFlashMessage(
          'Password reset email sent failed. Something went wrong !!!',
        );
      });
  };

  onDeleteUser = uid => {
    auth()
      .deleteUser(uid)
      .then(() => {})
      .catch(error => {});
  };

  onLogout = () => {
    auth()
      .signOut()
      .then(() => {})
      .catch(error => {});
  };

  onAddCategory = async category => {
    firestore()
      .collection('books')
      .doc(category)
      .set({})
      .then(res => {
        ShowFlashMessage('Category Added successfully');
      })
      .catch(error => {
        ShowFlashMessage('Category Addition failed. Something went wrong !!!');
      });
  };

  onAddBook = async (category, book) => {
    firestore()
      .collection('Books')
      .doc(category)
      .collection('data')
      .add(book) // Change here the object
      .then(res => {
        ShowFlashMessage('Book Added successfully');
      })
      .catch(error => {
        ShowFlashMessage('Book Addition failed. Something went wrong !!!');
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
      collectionSnapshot.forEach(async documentSnapshot => {
        categoryArr.push(documentSnapshot.id);
      });
    });
    await bookCollections
      .doc(item)
      .collection('data')
      .get()
      .then(collection => {
        collection.forEach(async documentSnapshot => {
          dataArray.push(documentSnapshot.data());
        });
      });
    return dataArray;
  };

  onFindBooksCategories = async () => {
    const categoryArr = [];
    await bookCollections.get().then(collectionSnapshot => {
      collectionSnapshot.forEach(async documentSnapshot => {
        categoryArr.push(documentSnapshot.id);
      });
    });
    return categoryArr;
  };
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
