import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { withNavigation } from 'react-navigation';
import { Appbar, Button } from 'react-native-paper';


class CustomHeader extends Component {

  onSubmit = e => {
    this.props.logoutUser(this.props.navigation);
  }

  render() {
    return (
      <Appbar.Header style={{backgroundColor: "#F9C729",height:45}}>
        <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
        <Appbar.Content
          title={this.props.title}
          onPress={this.props.onPress}
        />
        <Button onPress={this.onSubmit}>Logout</Button>
      </Appbar.Header>
    );
  }
}

CustomHeader.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withNavigation(CustomHeader));
