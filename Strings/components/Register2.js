import React, { Component } from 'react';
import { Container, Button, Content, Form, Input, Label, Item, Picker, Icon } from 'native-base';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';

export default class Register2 extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Text style={styles.head}>Register</Text>
            <Item stackedLabel>
              <Label>Skills</Label>
              <Input />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="--" value="key0" />
                <Picker.Item label="Solo" value="key1" />
                <Picker.Item label="Band" value="key2" />
                
              </Picker>
            </Item>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => navigate('Login')}>
            <Text style={styles.textStyle}>Register</Text>
            </TouchableOpacity>
       </KeyboardAvoidingView>     
            
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
  buttonStyle: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#EAB31E',
    borderRadius: 20, 
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Roboto' 
  },
  head: {
    marginBottom: 50,
    fontSize: 36,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
});