import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Container, Content, Text, Footer, FooterTab, Button, Icon } from "native-base";

export default class Profile extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>PROFILE</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={(e) => {
                e.preventDefault()
                this.props.navigation.navigate("Home")
              }}
            >
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button>
              <Icon name="navigate" />
            </Button>
            <Button active>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
