import React, { Component } from 'react';
import { Container, Button, Content, Form, Item, Card, Input, Label } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { withNavigation } from 'react-navigation';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData,this.props.navigation);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }  


  render() {
    const { errors } = this.state;
    return (
      <Container style={{backgroundColor: '#F9C729'}}><Content>
      <Card style={{marginTop:120}}>
      <View style={styles.container} behavior="padding" enabled>
            <Text style={styles.head}>Login</Text>
            <Item regular style={{borderColor:'black'}}>
              <Input onChangeText={(email) => this.setState({email : email})} value={this.state.email} placeholder="Email" />
              { (errors.email) && <Text style={{color:'red'}}>{errors.email}</Text>}
            </Item>
            <Item regular style={{borderColor:'black'}}>
              <Input secureTextEntry={true} onChangeText={(password) => this.setState({password : password})} value={this.state.password} placeholder="Password" />
              { (errors.password) && <Text style={{color:'red'}}>{errors.password}</Text>}
            </Item>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.onSubmit}>
            <Text style={styles.textStyle}>Login</Text>
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
    width: 150,
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withNavigation(Login));

