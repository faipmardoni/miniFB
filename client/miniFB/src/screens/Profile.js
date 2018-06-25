import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import { FETCH_ME } from "../graphql/queries";
import { graphql } from 'react-apollo';

class Profile extends Component {
  async componentDidMount() {
    await this.props.data.refetch()
  }
  handleLogout = () => {
    return this.props.screenProps.changeLoginState(false);
  };
  handleLoading = () => {
    const { me, loading } = this.props.data;
    if (loading) {
      return (
        <Text style={{ alignSelf: "center" }}>LOADING</Text>
      )
    } else if (me){
      const { photo_profile, name, email, statuses, likes, comments } = me
      return (
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: photo_profile }} />
              <Body>
                <Text>{name}</Text>
                <Text note>{email}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: '#87838B' }}>
                <Text>{statuses.length} Status</Text>
                <Text>{likes.length} Likes</Text>
                <Text>{comments.length} Comments</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      )
    }
  }
  render() {
    return (
      <Container style={{ marginTop: 25, padding: 10 }}>
        <Content>
          {this.handleLoading()}
          <Button
            style={{ marginTop: 15 }}
            primary
            block
            onPress={this.handleLogout}
          ><Text>LOGOUT</Text></Button>
        </Content>
      </Container>
    )
  }
}

export default graphql(FETCH_ME)(Profile)
