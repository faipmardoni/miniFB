import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import { REGISTER_USER } from "../graphql/queries";
import { graphql } from "react-apollo";

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});

class Register extends Component {
  static navigationOptions = {
    title: 'Register'
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
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
      const { name, email, password } = this.state
      let { data } = await this.props.mutate({
        variables: {
          name,
          email,
          password
        }
      })
      if(data) {
        Alert.alert("successfully register")
        this.props.navigation.goBack()
        this.setState({
          name: '',
          email: '',
          password: ''
        })
      }
    } catch (error) {
      Alert.alert("failed register please try again")
      console.log('error :', error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={value => this.handleInputChange('name', value)}
          autoCorrect={false}
          returnKeyType="next"
          placeholder='Name'
          value={this.state.name}
          placeholderTextColor='black' />
          
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
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default graphql(REGISTER_USER)(Register);