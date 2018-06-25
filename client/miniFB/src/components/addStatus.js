import React, { Component } from 'react';
import { AlertIOS } from "react-native";
import { ADD_STATUS, EDIT_STATUS } from "../graphql/queries";
import { graphql, compose } from "react-apollo";
import { Content, Form, Textarea, Text, Button } from "native-base";

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
      if (this.props.status) {
        const { _id, user } = this.props.status
        const newStatus = this.state.status
        let { data } = await this.props.editStatus({
          variables: {
            _id,
            status: newStatus,
            userId: user._id
          }
        })
        if (data.editStatus) {
          AlertIOS.alert('Success!', 'Successfully Edit status')
        } else {
          AlertIOS.alert('Failed!', 'This is not your status')
        }
      } else {
        const { status } = this.state
        let { data } = await this.props.addStatus({
          variables: {
            status
          }
        })
        if (data) {
          if (data.addStatus) {
            AlertIOS.alert('Success!', 'Successfully add status')
          }
        }
      }
      this.setState({
        status: ''
      })
      this.props.refresh()
    } catch (error) {
      console.log('error :', error);
    }
  }

  componentDidMount() {
    if (this.props.status) {
      this.setState({
        status: this.props.status.status
      })
    }
  }

  render() {
    return (
      <Content style={{ marginLeft: 5, marginRight: 5, padding: 15 }}>
        <Form>
          <Textarea rowSpan={3} bordered onChangeText={value => this.handleInputChange('status', value)} value={this.state.status} placeholder="What's on your mind?"/>
        </Form>
        <Button
          style={{ marginTop: 15 }}
          primary
          block
          onPress={this.handleSubmit}
        ><Text>{this.props.status ? "Update":"Publish"}</Text></Button>
      </Content>
    )
  }
}
export default compose(
  graphql(ADD_STATUS, { name: 'addStatus' }),
  graphql(EDIT_STATUS, { name: 'editStatus' })
)(AddStatus)

