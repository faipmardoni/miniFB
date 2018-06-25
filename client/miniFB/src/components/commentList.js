import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl
} from "react-native";
// import { graphql } from "react-apollo";
// import gql from 'graphql-tag';

// import { FETCH_STATUS } from "../graphql/queries";

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

export default class CommentList extends Component {
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

  _keyExtractor = (item) => item._id;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  handleLoading = () => {
    return (
      <FlatList
        data={this.props.status.comments}
        renderItem={({ item }) => (
          <Text>{JSON.stringify(item)}</Text>
          // <Status status={item} navigation={{...this.props.navigation}}/>
        )}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this._keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.handleLoading()}
      </View>
    )
  }
}

// export default graphql(FETCH_STATUS, 
//   {
//     options: {
//       variables: {
//         statusId: this.props.statusId
//       }
//     }
//   }
// )(CommentList)
