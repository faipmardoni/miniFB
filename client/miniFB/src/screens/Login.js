import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';
import { LOGIN_USER } from '../graphql/queries';
import { graphql } from 'react-apollo';

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "80%",
    marginTop: 200,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonRegister: {
    backgroundColor: 'red',
    paddingVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (field, value) => {
    const newState = {
      ...this.state,
      [field]: value,
    };
    this.setState(newState);
  };

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { email, password } = this.state
      let { data } = await this.props.mutate({
        variables: {
          email,
          password
        }
      })
      if (data) {
        if (data.login) {
          return this.props.screenProps.changeLoginState(true, data.login.token)
        } else {
          return AlertIOS.alert("Error", "Please fill form correctly")
        }
      }
    } catch (error) {
      console.log('error :', error);
    }
    this.setState({
      email: '',
      password: ''
    })
  }

  goRegister = (e) => {
    e.preventDefault();
    this.props.navigation.push("Register");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          alignSelf: "center",
          marginBottom: 10
        }}>Please Login or Register!</Text>
        <TextInput style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={value => this.handleInputChange('email', value)}
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType="next"
          placeholder='Email'
          value={this.state.email}
          placeholderTextColor='black' />

        <TextInput style={styles.input}
          returnKeyType="go"
          onChangeText={value => this.handleInputChange('password', value)}
          placeholder='Password'
          placeholderTextColor='black'
          value={this.state.password}
          secureTextEntry />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={this.goRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default graphql(LOGIN_USER)(Login)