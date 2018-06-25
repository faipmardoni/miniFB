import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import { graphql } from "react-apollo";
import { FETCH_STATUSES } from "../graphql/queries";
import Status from "./status";
import { Content, List, ListItem } from "native-base";
import AddStatus from "./addStatus";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderColor: "#2980b6",
    borderWidth: 2,
    paddingVertical: 20,
    height: 500,
    marginBottom: 15
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

class StatusList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.data.refetch().then(() => {
      this.setState({ refreshing: false });
    });
  }

  handleLogout = () => {
    return this.props.changeLoginState(false);
  };

  handleLoading = () => {
    const { statuses, loading } = this.props.data;
    if (loading) {
      return (
        <Text>LOADING</Text>
      )
    }
    return (
        <List dataArray={statuses}
          renderRow={(item) =>
            <ListItem>
              <Status status={item} navigation={{ ...this.props.navigation }} />
            </ListItem>
          }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          } />
      // <View>
      //   {statuses.map(item => {
      //     return (
      //       <Status key={item._id} status={item} navigation={{ ...this.props.navigation }} />
      //     )
      //   })}
      //   {/* <FlatList
      //     data={statuses}
      //     renderItem={({ item }) => (
      //       <Status status={item} navigation={{ ...this.props.navigation }} />
      //     )}
      //     keyExtractor={this._keyExtractor}
      //     refreshControl={
      //       <RefreshControl
      //         refreshing={this.state.refreshing}
      //         onRefresh={this._onRefresh.bind(this)}
      //       />
      //     }
      //   /> */}
      // </View>

    )
  }

  render() {
    return (
      // <View style={styles.container}>
      <Content>
        <AddStatus />
        {this.handleLoading()}
        {/* <TouchableOpacity style={styles.buttonContainer}
          onPress={this.handleLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity> */}
      </Content>
    )
  }
}

export default graphql(FETCH_STATUSES)(StatusList);
