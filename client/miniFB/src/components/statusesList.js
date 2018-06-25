import React, { Component } from 'react';
import Status from "./status";
import { Text, Content, List, ListItem } from "native-base";
import AddStatus from "./addStatus";

export default class StatusList extends Component {

  handleLoading = () => {
    const { statuses, loading } = this.props.data;
    if (loading) {
      return (
        <Text style={{ alignSelf: "center" }}>LOADING</Text>
      )
    }
    return (
      <List dataArray={statuses}
        renderRow={(item) =>
          <ListItem>
            <Status status={item} navigation={{ ...this.props.navigation }} refresh={this.props.refresh} />
          </ListItem>
        } />
    )
  }

  render() {
    return (
      <Content>
        <AddStatus refresh={this.props.refresh} />
        {this.handleLoading()}
      </Content>
    )
  }
}
