import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';

class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:true,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onSubmit = e => {
    this.props.logoutUser(this.props.navigation);
    this.setState({modalVisible: false});
  }

  redirect = e => {
    this.props.navigation.navigate("AuthStack");
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <Text style={styles.name}>Are you sure you want to Logout?</Text>
              </View>
              <View style={styles.popupButtons}>
                <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={this.onSubmit}>
                  <Text style={styles.buttonText}>YES</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.sendButtoncancel]} onPress={this.redirect}>
                  <Text style={styles.buttonText}>NO</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#eeeeee"
  },
  name:{
    fontSize:18,
    flex:1,
    marginTop: 10,
    alignSelf:'center',
    color:"red",
    fontWeight:'bold'
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 200,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    alignItems: 'center',
    margin: 5,
    height:40,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'space-around'
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  },
  buttonContainer: {
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:80,
    borderRadius:10,
  },
  sendButton: {
    backgroundColor: "red",
  },
  sendButtoncancel: {
    backgroundColor: "green",
  },
  buttonText: {
    color: '#fff',
  }
}); 

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withNavigation(Logout));
