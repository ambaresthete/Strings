import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView,TouchableOpacity, ScrollView,Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { withNavigation } from 'react-navigation';
import { Appbar, Button, TextInput, HelperText } from 'react-native-paper';


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
      <View>
        <Appbar.Header style={{ backgroundColor: "#F9C729" }}>
          <Appbar.BackAction />
          <Appbar.Content title="Login" />
        </Appbar.Header>
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              mode="outlined"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email: email })}
              error={
                this.state.errors.email ? this.state.errors.email : false
              }
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
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.buttonStyle}
              onPress={this.onSubmit}
            >
              <Text style={styles.btStyle}>Login</Text>
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

