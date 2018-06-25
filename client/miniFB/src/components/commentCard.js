import React, { Component } from 'react';
import { AlertIOS } from "react-native";
import { DELETE_COMMENT } from "../graphql/queries";
import { graphql } from "react-apollo";
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ActionSheet } from 'native-base';

var BUTTONS = [
  { text: "Edit", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Report", icon: "analytics", iconColor: "#f42ced" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];

var CANCEL_INDEX = 3;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }

  handleDelete = async () => {
    try {
      const { _id, user } = this.props.comment;
      let { data } = await this.props.mutate({
        variables: {
          _id: _id,
          userId: user._id
        }
      });
      if (data) {
        if (data.length !== 0) {
          AlertIOS.alert("success deleted comment")
          this.props.refresh()
          this.props.navigation.navigate("Home")
        } else {
          AlertIOS.alert("it's not your comment")
        }
      }
    } catch (error) {
      console.log('error :', error);
    }
  }

  render() {
    const { comment, user } = this.props.comment
    const { handleDelete } = this
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: user.photo_profile }} />
            <Body>
              <Text>{user.name}</Text>
              <Text note>{user.email}</Text>
            </Body>
          </Left>
          <Right>
            <Button
              transparent
              ref={(c) => this._button = c}
              onPress={() => {
                ActionSheet.show({
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: 2,
                  title: "More Options"
                },
                  buttonIndex => {
                    switch (buttonIndex) {
                      case 0:
                        AlertIOS.alert("Coming Soon!")
                        break;
                      case 1:
                        AlertIOS.alert("Coming Soon!")
                        break;
                      case 2:
                        handleDelete()
                        break;
                      case 3:
                        break
                      default:
                        break;
                    }
                  })
              }}
            >
              <Icon active name="more" />
            </Button>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Left>
            <Body>
              <Text style={{ marginBottom: 20 }}>{comment}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    )
  }
}

export default graphql(DELETE_COMMENT)(Comment)