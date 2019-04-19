import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {ActivityIndicator,Chip} from 'react-native-paper';
import { getProfileByHandle } from '../../actions/profileActions';
import ProExperience from "./ProExperience";
import ProEducation from "./ProEducation";
import ProMusic from "./ProMusic";
import ProSkills from "./ProSkills";
import {List,ListItem,Body,Text} from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

class Profile extends Component {
  static navigationOptions = {
         drawerLabel: () => null
    }
  componentDidMount() {
    if (this.props.navigation.getParam('profile_handle')) {
      this.props.getProfileByHandle(this.props.navigation.getParam('profile_handle'));
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.profile.profile === null && this.props.profile.loading) {
  //     this.props.history.push('/not-found');
  //   }
  // }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = (
        <View style={styles.body}>
        <ActivityIndicator animating={true} color="black" />
        </View>
      );
    } else {

      let url = `http://192.168.43.175:5000/static/${profile.displaypic}`;
      profileContent = (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.header} />
            <Image style={styles.avatar} source={{ uri: url }} />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{profile.handle}</Text>
                <Text style={styles.description}>{profile.bio}</Text>
                <Text style={styles.info}>{profile.status}</Text>
                {Object.keys(profile.skills).length > 0 ? (
                  <ProSkills skills={profile.skills} />
                ) : null}
              </View>
              <View style={{ borderColor: "yellow", borderWidth: 2 }}>
                {Object.keys(profile.experience).length > 0 ? (
                  <ProExperience experience={profile.experience} />
                ) : null}
                {Object.keys(profile.education).length > 0 ? (
                  <ProEducation education={profile.education} />
                ) : null}
                {Object.keys(profile.music).length > 0 ? (
                  <ProMusic
                    navigation={this.props.navigation}
                    music={profile.music}
                  />
                ) : null}
              </View>
              <View>
                <List style={{backgroundColor:"#d3d3d3", borderColor: "yellow", borderWidth: 2 }}>
                  <ListItem
                    itemDivider
                    style={{
                      color: "black",
                      backgroundColor: "#EAB31A",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text>Contact</Text>
                  </ListItem>
                  <ListItem>
                    <Body>
                      <Text>{profile.contact}</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <Body>
                      <Text>{profile.user.email}</Text>
                    </Body>
                  </ListItem>
                </List>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <View>
      {profileContent}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#EAB31A",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);