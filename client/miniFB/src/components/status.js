import React, { Component } from 'react';
import { AlertIOS, Image, Modal } from "react-native";
import AddStatus from "./addStatus";
import { DELETE_STATUS, LIKE, DISLIKE } from "../graphql/queries";
import { graphql, compose } from "react-apollo";
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ActionSheet, Container, Content } from 'native-base';

var BUTTONS = [
  { text: "Edit", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Report", icon: "analytics", iconColor: "#f42ced" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];

var CANCEL_INDEX = 3;

class Status extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      active: 'true'
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  handleDelete = async () => {
    try {
      const { _id, status, user } = this.props.status;
      let { data } = await this.props.deleteStatus({
        variables: {
          _id: _id,
          userId: user._id
        }
      });
      if (data) {
        if (data.deleteStatus !== null) {
          AlertIOS.alert("success deleted status")
          this.props.refresh()
        } else {
          AlertIOS.alert("not your status")
        }
      }
    } catch (error) {
      console.log('error :', error);
    }
  }

  handleModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <Container style={{ marginTop: 22 }}>
          <Content>
            <AddStatus refresh={this.props.refresh} status={this.props.status} setModalVisible={this.setModalVisible} />
            <Button
              style={{ marginLeft: 20, marginRight: 20 }}
              danger
              block
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            ><Text>Close</Text></Button>
          </Content>
        </Container>
      </Modal>
    )
  }

  goComment = (e) => {
    e.preventDefault()
    this.props.navigation.navigate("Comment", {
      statusId: this.props.status._id,
      comments: this.props.status.comments,
      refresh: this.props.refresh
    })
  }

  goLike = async (e) => {
    e.preventDefault()
    try {
      const { _id } = this.props.status
      let { data } = await this.props.like({
        variables: {
          status: _id
        }
      })
      if(data.like) {
        this.props.refresh()
      }else {
        let { data } = await this.props.dislike({
          variables: {
            status: _id
          }
        })
        this.props.refresh()
      }
    } catch (error) {
      console.log('error :', error);
    }
  }

  render() {
    const { status, user, likes, comments } = this.props.status
    const { handleDelete, handleModal, setModalVisible } = this
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
                        setModalVisible(true)
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
              <Text style={{ marginBottom: 20 }}>{status}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png' }} style={{ height: 200, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent onPress={this.goLike}>
              <Icon active name="thumbs-up" />
              <Text>{likes.length} Likes</Text>
            </Button>
            <Button
              transparent
              onPress={this.goComment}
            >
              <Icon active name="chatbubbles" />
              <Text>{comments.length} Comments</Text>
            </Button>
          </Left>
        </CardItem>
        {handleModal()}
      </Card>
    )
  }
}

export default compose(
  graphql(DELETE_STATUS, { name: 'deleteStatus' }),
  graphql(LIKE, { name: 'like' }),
  graphql(DISLIKE, { name: 'dislike' })
)(Status)
