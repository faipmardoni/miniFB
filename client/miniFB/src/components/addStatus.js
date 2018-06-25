import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, AlertIOS } from "react-native";
import { ADD_STATUS } from "../graphql/queries";
import { graphql } from "react-apollo";
import { Container, Content, Form, Textarea, Text, Button } from "native-base"

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderColor: "#2980b6",
    borderWidth: 2
  },
  input: {
    height: 60,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 15,
    color: 'black',
    borderColor: '#2980b6',
    borderWidth: 1,
    borderRadius: 5
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    borderRadius: 5,
    paddingVertical: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

class AddStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    }
  };

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { status } = this.state
      let { data } = await this.props.mutate({
        variables: {
          status
        }
      })
      if(data) {
        if(data.addStatus) {
          AlertIOS.alert('Success add status', 'please refresh list status to check')
        }
      }
    } catch (error) {
      console.log('error :', error);
    }
    this.setState({
      status: ''
    })
  }

  render() {
    return (
        <Content style={{marginLeft: 5, marginRight:5, padding: 15}}>
          <Form>
            <Textarea rowSpan={3} bordered onChangeText={value => this.handleInputChange('status', value)} value={this.state.status} placeholder="What's on your mind?" />
          </Form>
          <Button primary block><Text>Publish</Text></Button>
        </Content>
      // <View style={styles.container}>
      //   <TextInput 
      //     style={styles.input}
      //     onChangeText={value => this.handleInputChange('status', value)}
      //     returnKeyType="go"
      //     placeholder="what's going on?"
      //     value={this.state.status}
      //     placeholderTextColor="black"
      //   />
      //   <TouchableOpacity
      //     style={styles.buttonContainer}
      //     onPress={this.handleSubmit}>
      //     <Text style={styles.buttonText}>Publish</Text>
      //   </TouchableOpacity>
      // </View>
    )
  }
}

export default graphql(ADD_STATUS)(AddStatus)

