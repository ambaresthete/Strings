import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';


export default class Home extends React.Component {
  render() {
    const { push } = this.props.navigation;
    return (
      <ImageBackground
        source={require("../assets/home.jpg")}
        style={styles.image}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonStyle}
          onPress={() => push("Join")}
        >
          <Text style={styles.btStyle}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover"
  },
  buttonStyle: {
    position: "absolute",
    top: 500,
    left: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    backgroundColor: "#EAB31A",
    borderRadius: 20
  },
  btStyle: {
    fontSize: 18,
    fontFamily: "sans-serif",
    color: 'black'
  }
});
