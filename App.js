import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'

import firebase from 'firebase/app'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware)

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAk9N5fFvamSYbI8On6G-wwp2k1OOguRRE",
  authDomain: "ssnudes-73f16.firebaseapp.com",
  projectId: "ssnudes-73f16",
  storageBucket: "ssnudes-73f16.appspot.com",
  messagingSenderId: "182842182822",
  appId: "1:182842182822:web:b67c83ef0ba712c4ddb867",
  measurementId: "G-SMEMZEBV33"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'

const Stack = createStackNavigator(); //this is the primary view

export class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;

    if(!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading...</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} ></Stack.Screen>
    
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            {/* <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
