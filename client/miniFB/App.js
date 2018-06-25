/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { YellowBox } from "react-native";

import { SwitchNavigator, StackNavigator, createStackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import CommentScreen from "./src/screens/Comment";
import ProfileScreen from "./src/screens/Profile";
import { signIn, signOut, getToken } from "./src/util";
import { Icon, Root } from 'native-base';

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

const AppStack = StackNavigator({ Comment: CommentScreen });

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
  "Remote debugger",
  "Method",
  ""
]);

const TabStack = TabNavigator(
  {
    Home: { screen:  HomeScreen},
    Profile: { screen: ProfileScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        return <Icon name={iconName} color={tintColor} />
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const Main = SwitchNavigator(
  {
    Tab: TabStack,
    Stack: AppStack,
  },
  {
    initialRouteName: 'Tab',
  }
);

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
      <Root>
        <ApolloProvider client={client}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {this.state.loggedIn ? <Main screenProps={{ changeLoginState: this.handleChangeLoginState }} /> : <AuthStack screenProps={{ changeLoginState: this.handleChangeLoginState }}
            />}
          </TouchableWithoutFeedback>
        </ApolloProvider>
      </Root>

    )
  }
}