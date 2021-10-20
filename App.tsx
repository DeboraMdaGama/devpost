import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
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
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';

declare global{
  namespace ReactNavigation{
    interface RootParamList{
      Home: undefined;
      Login:undefined;
      NewPost:undefined;
      PostsUser:{title:string, userId:string};
      Profile:undefined;
      Search:undefined;
    }
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#36393f' barStyle='light-content' translucent={false}/>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
};


export default App;
