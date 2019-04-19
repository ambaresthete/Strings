import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {TextInput,HelperText,Button} from 'react-native-paper';
import {View,StyleSheet, TouchableOpacity,Text} from 'react-native';
import { addPost } from '../../actions/postActions';
import {Card,CardItem,Body} from 'native-base';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: profile.displaypic
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
  }

  render() {
    const { errors } = this.state;

    return (
        <Card>
            <TextInput
              multiline
              style={{marginHorizontal:10,marginTop:5}}
              mode="outlined"
              label="Create Post"
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
              error={errors.text ? errors.text : false}
            />
            <HelperText
              type="error"
              visible={errors.text ? errors.text : false}
            >
              {errors.text}
            </HelperText>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.buttonStyle}
              onPress={this.onSubmit}
            >
              <Text style={styles.btStyle}>Post</Text>
            </TouchableOpacity>
        
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#EAB31A",
    marginHorizontal:10
  },
  btStyle: {
    fontSize: 18,
    fontFamily: "sans-serif",
    color: "white"
  }
});

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { addPost })(PostForm);