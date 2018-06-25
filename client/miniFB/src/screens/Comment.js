import React, { Component } from 'react';
import {
  View, StyleSheet
} from "react-native";
import CommentList from "../components/commentList";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 5
  }
})

export default class Comment extends Component {
  static navigationOptions = {
    title: "Comments"
  }

  render() {
    return (
      <View style={styles.container}>
        <CommentList navigation={{...this.props.navigation}} status={{...this.props.status}}/>
      </View>
    )
  }
}
