import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Content, Form, Item, Input, Icon, InputGroup, Label, Card } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { registerUser } from '../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
    
  }

  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors){
      this.setState({ errors: nextProps.errors });
      
    }
  }

  

  onSubmit = e => {
    
    
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser,this.props.navigation);
    
}

  
  render() {
    

    return (
      <Container style={{backgroundColor: '#F9C729'}}><Content>
      <Card style={{marginTop:90}}>
      <View style={styles.container} behavior="padding" enabled>
          
          <Text style={styles.head}>Register</Text>
              <Item regular style={{borderColor:'black'}}>
                <Input onChangeText={(name) => this.setState({name : name})} value={this.state.name} placeholder="Username"/>
              </Item>
              { (this.state.errors.name) && <Text style={{color:'red'}}>{this.state.errors.name}</Text>}
              <Item regular style={{borderColor:'black'}}>
                <Input onChangeText={(email) => this.setState({email : email})} value={this.state.email} placeholder="Email"/>
              </Item>
              { (this.state.errors.email) && <Text style={{color:'red'}}>{this.state.errors.email}</Text>}
              <Item regular style={{borderColor:'black'}}>
                <Input secureTextEntry={true} onChangeText={(password) => this.setState({password : password})} value={this.state.password} placeholder="Password" />
              </Item>
              { (this.state.errors.password) && <Text style={{color:'red'}}>{this.state.errors.password}</Text>}
              <Item regular style={{borderColor:'black'}}>
                <Input secureTextEntry={true} onChangeText={(password2) => this.setState({password2 : password2})} value={this.state.password2} placeholder="Confirm Password" />
              </Item>
              { (this.state.errors.password2) && <Text style={{color:'red'}}>{this.state.errors.password2}</Text>}
              <TouchableOpacity style={styles.buttonStyle} onPress={this.onSubmit}>
                <Text style={styles.textStyle}>Register</Text>
              </TouchableOpacity>
              
       </View>     
            </Card>
            </Content></Container>
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
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#EAB31A',
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps,{registerUser})(withNavigation(Register));