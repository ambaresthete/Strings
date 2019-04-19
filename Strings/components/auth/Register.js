import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,Text,TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { registerUser } from '../../actions/authActions';
import { Appbar, Button, TextInput, HelperText } from 'react-native-paper';

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
      <View>
        <Appbar.Header style={{ backgroundColor: "#F9C729" }}>
          <Appbar.BackAction />
          <Appbar.Content title="Register" />
        </Appbar.Header>
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              mode="outlined"
              label="Full Name"
              value={this.state.name}
              onChangeText={name => this.setState({ name: name })}
              error={
                this.state.errors.name ? this.state.errors.name : false
              }
              onFocus={() => this.setState({ errors: {} })}
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.name ? this.state.errors.name : false
              }
            >
              {this.state.errors.name}
            </HelperText>
            <TextInput
              mode="outlined"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email: email })}
              error={
                this.state.errors.email ? this.state.errors.email : false
              }
              onFocus={() => this.setState({ errors: {} })}
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.email ? this.state.errors.email : false
              }
            >
              {this.state.errors.email}
            </HelperText>
            <TextInput
              mode="outlined"
              secureTextEntry={true}
              label="Password"
              value={this.state.password}
              onChangeText={password =>
                this.setState({ password: password })
              }
              error={
                this.state.errors.password
                  ? this.state.errors.password
                  : false
              }
              onFocus={() => this.setState({ errors: {} })}
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.password
                  ? this.state.errors.password
                  : false
              }
            >
              {this.state.errors.password}
            </HelperText>
            <TextInput
              mode="outlined"
              secureTextEntry={true}
              label="Confirm Password"
              value={this.state.password2}
              onChangeText={password2 =>
                this.setState({ password2: password2 })
              }
              error={
                this.state.errors.password2
                  ? this.state.errors.password2
                  : false
              }
              onFocus={() => this.setState({ errors: {} })}
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.password2
                  ? this.state.errors.password2
                  : false
              }
            >
              {this.state.errors.password2}
            </HelperText>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.buttonStyle}
              onPress={this.onSubmit}
            >
              <Text style={styles.btStyle}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 80
  },
  buttonStyle: {
    marginTop: 15,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#EAB31A"
  },
  btStyle: {
    fontSize: 20,
    fontFamily: "sans-serif",
    color: "white"
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