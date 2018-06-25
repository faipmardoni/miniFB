/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { YellowBox } from "react-native";

import { createStackNavigator } from 'react-navigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import AddCommentScreen from './src/screens/AddComment';
import CommentScreen from "./src/screens/Comment";
import ProfileScreen from "./src/screens/Profile";
import { signIn, signOut, getToken } from "./src/util";

// const a = signIn("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjdiOTNiMTYwMjlmNmY4NzdjYzlhMiIsIm5hbWUiOiJGYWlwIE1hcmRvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTI5ODQxNzk3fQ.kHayTEpzLhFdyr3ac-8eLAe0VugJZVvfcxcahz8_eZM")

const client = new ApolloClient({
  uri: "http://172.20.10.5:3000/graphql",
  request: async (operation) => {
    const token = await getToken()
    if (token) {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : null
        }
      })
    }
  }
});

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: "Profile",
      headerLeft: null,
    }
  },
  AddComment: AddCommentScreen,
  Comment: CommentScreen
}, {
    initialRouteName: 'Home',
  });

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      headerLeft: null
    }
  },
  Register: RegisterScreen
}, {
    initialRouteName: 'Login',
  });

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Remote debugger"
]);

// type Props = {};
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  async componentDidMount() {
    const token = await getToken()
    if (token) {
      this.setState({ loggedIn: true });
    }
  }

  handleChangeLoginState = (loggedIn = false, token) => {
    this.setState({ loggedIn });
    if (loggedIn) {
      signIn(token);
    } else {
      signOut();
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.loggedIn ? <RootStack screenProps={{ changeLoginState: this.handleChangeLoginState }} /> : <AuthStack screenProps={{ changeLoginState: this.handleChangeLoginState }} 
        />}
      </ApolloProvider>
    )
  }
}