import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, AlertIOS, Image } from "react-native";
import { DELETE_STATUS, EDIT_STATUS } from "../graphql/queries";
import { graphql } from "react-apollo";
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderColor: "#2980b6",
    borderWidth: 2,
    borderRadius: 5
  }
})

class Status extends Component {

  handleDelete = async (e) => {
    e.preventDefault()
    try {
      const { _id, status, user } = this.props.status;
      console.log(status)
      let { data } = await this.props.mutate({
        variables: {
          _id: _id,
          userId: user._id
        }
      });
      if (data) {
        if (data.deleteStatus !== null) {
          AlertIOS.alert("success deleted status")
        } else {
          AlertIOS.alert("not your status")
        }
      }
    } catch (error) {
      console.log('error :', error);
    }
  }

  goAddComment = (e) => {
    e.preventDefault()
    this.props.navigation.navigate("Comment", {
      status: this.props.status
    })
  }

  render() {
    const { status, user, likes, comments } = this.props.status
    return (
      // <View style={styles.container}>
      // <Content>
      //   <Card>
      //     <CardItem header>
      //       <Text>{user.name}</Text>
      //     </CardItem>
      //     <CardItem>
      //       <Body>
      //         <Text>{status}</Text>
      //         <Text>Comment: {comments.length}   likes: {likes.length}</Text>
      //       </Body>
      //     </CardItem>
      //     <CardItem footer>
      //       <View style={{
      //         flexDirection: "row",
      //       }}>
      //         <TouchableOpacity
      //           style={{ marginRight: 10, backgroundColor: "red", padding: 5 }}
      //           onPress={this.handleDelete}>
      //           <Text>Delete</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={{ marginRight: 10, backgroundColor: "blue", padding: 5 }}
      //           onPress={this.handleDelete}>
      //           <Text>Edit</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={{ marginRight: 10, backgroundColor: "blue", padding: 5 }}
      //           onPress={this.goAddComment}>
      //           <Text>Add Comment</Text>
      //         </TouchableOpacity>
      //       </View>
      //     </CardItem>
      //   </Card>
      // </Content>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: user.photo_profile }} />
              <Body>
                <Text>{user.name}</Text>
                <Text note>{user.email}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Left>
              <Body>
                <Text style={{marginBottom: 20}}>{status}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png' }} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>{likes.length} Likes</Text>
              </Button>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>{comments.length} Comments</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

export default graphql(DELETE_STATUS, EDIT_STATUS)(Status)
