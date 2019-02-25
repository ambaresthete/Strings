import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


export default class Join extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        
        <View style={styles.container}>
        <Text style={styles.textStyle}>STRINGS</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigate('Register')}>
        <Text style={styles.btStyle}>Join Us</Text>
        </TouchableOpacity>
        <Text style={styles.accStyle} onPress={() => navigate('Login')}>I already have an account</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9C729',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 36,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  accStyle: {
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  buttonStyle: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 50,
    backgroundColor: '#EAB31A',
    borderRadius: 30 
  },
  btStyle: {
    fontSize: 24,
    fontFamily: 'Roboto' 
  }
});
