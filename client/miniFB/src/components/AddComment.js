import React, { Component } from 'react';
import {
  AlertIOS
} from "react-native";
import { ADD_COMMENT } from "../graphql/queries";
import { graphql, compose } from "react-apollo";
import { Content, Form, Textarea, Text, Button } from 'native-base';

class AddCommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { comment } = this.state;
      const { data } = await this.props.mutate({
        variables: {
          comment: comment,
          status: this.props.statusId
        }
      })
      if (data.addComment) {
        AlertIOS.alert("Success", "successfully add Comment")
        this.props.refresh()
        this.setState({
          comment: ''
        })
        this.props.navigation.navigate("Home")
      }
    } catch (error) {
      console.log('error :', error);
    }
  }

  render() {
    return (
      <Content>
        <Form style={{ marginBottom: 15 }}>
          <Textarea rowSpan={3} bordered onChangeText={value => this.handleInputChange('comment', value)} value={this.state.status} placeholder="Add Your Comment?" />
        </Form>
        <Button
          style={{ marginTop: 15 }}
          primary
          block
          onPress={this.handleSubmit}
        ><Text>Publish</Text></Button>
      </Content>
      // <Content>
      //   <TextInput style={styles.input}
      //     onChangeText={value => this.handleInputChange('comment', value)}
      //     autoCorrect={false}
      //     returnKeyType="next"
      //     placeholder='Your comment'
      //     value={this.state.comment}
      //     placeholderTextColor='black' />
      //   <TouchableOpacity
      //     style={styles.buttonContainer}
      //     onPress={this.handleSubmit}>
      //     <Text style={styles.buttonText}>PUBLISH</Text>
      //   </TouchableOpacity>
      // </Content>
    )
  }
}

export default graphql(ADD_COMMENT)(AddCommentScreen);