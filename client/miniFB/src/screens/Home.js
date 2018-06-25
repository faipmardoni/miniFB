import React, { Component } from "react";
import { StyleSheet } from "react-native";
import StatusesList from "../components/statusesList";
import { Container, Content, Footer, FooterTab, Button, Icon } from "native-base"

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  render() {
    const { changeLoginState } = this.props.screenProps
    return (
      <Container>
        <Content>
          <StatusesList changeLoginState={changeLoginState} navigation={{ ...this.props.navigation }} />
        </Content>
        <Footer>
          <FooterTab>
            <Button active>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button>
              <Icon name="navigate" />
            </Button>
            <Button
              onPress={(e) => {
                e.preventDefault()
                this.props.navigation.navigate("Profile")
              }}
            >
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
