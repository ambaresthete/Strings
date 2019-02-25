import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import TabNavigator from '../navigation/TabNavigator';

export default class Search extends React.Component {
  render() {
    return (
      <View style={styles.head}>
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder="Search Band or Solo Artists"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
        />
      </View>
      <TabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    flex: 1,
    backgroundColor: '#F9C729'
  },
  container: {
    height: 40,
    marginTop: 40,
    backgroundColor: '#666',
  },
  textInput: {
    flex: 1,
    color: 'white',
    textAlign: 'center'
  },
});
