/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import Login from './src/container/signedout/Login';
import Dashboard from './src/container/signedin/Dashboard';
import Home from './src/container/signedin/BookList';
import BookDetails from './src/container/signedin/BookDetails';
import ViewPDF from './src/container/signedin/ViewPDF';
import ChangePassword from './src/container/signedin/ChnagePassword';
import ForgotPassword from './src/container/signedout/ForgotPassword';
import color from './src/common/color';
import AddCategory from './src/container/signedin/AddCategory';
import AdminDashboard from './src/container/signedin/AdminDashboard';
import Users from './src/container/signedin/Users';
import AddUser from './src/container/signedin/AddUser';
import AddBook from './src/container/signedin/AddBook';
import { store } from './src/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createStackNavigator();

  const [userToken, setuserToken] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  AsyncStorage.getItem('FirebaseUser')
    .then(async res => {
      setuserToken(res);
      if (JSON.parse(res) === 'YSn9f4uNh6R0pgBIJz10X8ZIFRB3') {
        await AsyncStorage.setItem('IsAdmin', res);
        setIsAdmin(res)
      } else {
        await AsyncStorage.setItem('IsAdmin', 'null');
      }
    })
    .finally(() => {
      setLoading(false);
    });

  function MyStack() {
    return (
      <Stack.Navigator
        headerMode="none"
        initialRouteName={
          userToken == null
            ? 'Login'
            : isAdmin != null
            ? 'AdminDashboard'
            : 'Home'
        }>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Home" component={Dashboard} />
        <Stack.Screen name="BookList" component={Home} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="Viewpdf" component={ViewPDF} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
      </Stack.Navigator>
    );
  }

  return loading ? (
    <></>
  ) : (
    // <View>
    // <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  />
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={color.themeColor3}
        />
        <MyStack />
      </NavigationContainer>
    </Provider>
    // </View>
  );
};

export default App;
