import React, { Component } from 'react';
import {
  View,
} from "react-native";
import { Text, Content, List, ListItem, Card, CardItem, Body } from "native-base";
import Comment from "./commentCard";

export default class CommentList extends Component {
  handleEmptyComment = () => {
    const { comments } = this.props
    if (comments.length === 0) {
      return (
        <Card>
          <CardItem>
            <Body>
              <Text>There is no comment</Text>
            </Body>
          </CardItem>
        </Card>
      )
    }
    return (
      <List
        dataArray={comments}
        renderRow={(item) => (
          <ListItem>
            <Comment comment={item} navigation={{ ...this.props.navigation }} refresh={this.props.refresh} />
          </ListItem>
        )}
      />
    )
  }
  render() {
    return (
      <Content style={{ margin: 15 }}>
        {this.handleEmptyComment()}
      </Content>
    )
  }
}
