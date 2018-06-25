import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AlertIOS
} from "react-native";
import { ADD_COMMENT } from "../graphql/queries";
import { graphql } from "react-apollo";
import { Content } from 'native-base';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 5
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
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

class AddCommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]:value 
    });
  };

  handleSubmit = async (e) => {
    const statusId = this.props.navigation.getParam('statusId', 'NO-ID');
    // console.log(statusId)
    e.preventDefault()
    try {
      const { comment } = this.state;
      const { data } = await this.props.mutate({
        variables: {
          comment: comment,
          status: statusId
        }
      })
      console.log('data :', data);
      if(data.addComment) {
        console.log(data)
        AlertIOS.alert("Success", "successfully add Comment")
      }
    } catch (error) {
      console.log('error :', error);
    }
    this.setState({
      comment: ''
    })
  }

  render() {
    return (
      // <View style={styles.container}>
      <View>
        <TextInput style={styles.input}
          onChangeText={value => this.handleInputChange('comment', value)}
          autoCorrect={false}
          returnKeyType="next"
          placeholder='Your comment'
          value={this.state.comment}
          placeholderTextColor='black' />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>PUBLISH</Text>
        </TouchableOpacity>
      </View>
      // </View>
    )
  }
}

export default graphql(ADD_COMMENT)(AddCommentScreen);