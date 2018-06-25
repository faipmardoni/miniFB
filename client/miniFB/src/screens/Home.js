import React, { Component } from "react";
import StatusesList from "../components/statusesList";
import { Container, Content } from "native-base";
import { FETCH_STATUSES } from "../graphql/queries";
import { graphql } from "react-apollo";

class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  async componentDidMount() {
    await this.props.data.refetch()
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.data.refetch().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { changeLoginState } = this.props.screenProps
    return (
      <Container style={{marginTop:25}}>
        <Content>
          <StatusesList changeLoginState={changeLoginState} navigation={{ ...this.props.navigation }} data={this.props.data} refresh={this._onRefresh}/>
        </Content>
      </Container>
    )
  }
}

export default graphql(FETCH_STATUSES)(Home);