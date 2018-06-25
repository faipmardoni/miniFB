import React, { Component } from 'react';
import { } from "react-native";
import CommentList from "../components/commentList";
import { Container, Content, Button, Text } from "native-base";
import AddComment from "../components/AddComment";

export default class Comment extends Component {
  static navigationOptions = {
    title: "Comments"
  }

  render() {
    const comments = this.props.navigation.getParam('comments', null);
    const refresh = this.props.navigation.getParam('refresh', null)
    const statusId = this.props.navigation.getParam('statusId', null)
    console.log(comments)
    return (
      <Container style={{ margin: 15 }}>
        <Content>
          <CommentList navigation={{ ...this.props.navigation }} comments={comments} refresh={refresh}/>
          <AddComment refresh={refresh} statusId={statusId} navigation={{ ...this.props.navigation }} />
          <Button
            style={{ marginTop: 15 }}
            primary
            block
            onPress={() => {
              this.props.navigation.navigate("Home")
            }}
          ><Text>BACK</Text></Button>
        </Content>
      </Container>
    )
  }
}
