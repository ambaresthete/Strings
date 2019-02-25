import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';


export default class Home extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        
        <ImageBackground
          source={require('../assets/home.jpg')}
          style={styles.image}
        >
        <View style={styles.button}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigate('Join')}>
        <Text style={styles.textStyle}>Get Started</Text>
        </TouchableOpacity> 
        </View>
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
    resizeMode: 'cover'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  buttonStyle: {
    position: 'absolute',
    top: 500,
    left: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#EAB31A',
    borderRadius: 20, 
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Roboto' 
  }
});
