import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { Text, StyleSheet, View, ScrollView,TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import CustomHeader from '../custom/CustomHeader';
import { withNavigation } from 'react-navigation';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import Music from './Music';
import { ActivityIndicator } from 'react-native-paper';

class Dashboard extends Component {
   _isMounted = false;

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
          <View style={styles.body}>
          <ActivityIndicator animating={true} color="black" />
          </View>
        );
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <ScrollView style={styles.disbody}>
            <View style={{ marginTop: 30, marginBottom: 20 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonStyle}
                onPress={() =>
                  this.props.navigation.navigate("EditProfile")
                }
              >
                <Text style={styles.btStyle}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonStyle}
                onPress={() =>
                  this.props.navigation.navigate("AddEducation")
                }
              >
                <Text style={styles.btStyle}>Add Education</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonStyle}
                onPress={() =>
                  this.props.navigation.navigate("AddExperience")
                }
              >
                <Text style={styles.btStyle}>Add Experience</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonStyle}
                onPress={() =>
                  this.props.navigation.navigate("AddMusic")
                }
              >
                <Text style={styles.btStyle}>Add Music</Text>
              </TouchableOpacity>
            </View>
            {Object.keys(profile.experience).length > 0 ? (
              <Experience experience={profile.experience} />
            ) : null}
            {Object.keys(profile.education).length > 0 ? (
              <Education education={profile.education} />
            ) : null}
            {Object.keys(profile.music).length > 0 ? (
              <Music
                navigation={this.props.navigation}
                music={profile.music}
              />
            ) : null}
          </ScrollView>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <View style={styles.body}>
            <Text style={styles.textStyle}>
              Looks like you haven't created your profile. Click on the
              button to create your profile now.
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.buttonStyleL}
              onPress={() =>
                this.props.navigation.push("CreateProfile")
              }
            >
              <Text style={styles.btStyle}>Create Profile</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <View>
        <CustomHeader title="Dashboard" navigation={this.props.navigation} onPress={() => this.props.navigation.navigate("Profile",{'profile_handle':profile.handle})} />
        </View>
        {dashboardContent}
        </View>
            
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },
  disbody: {
    flex: 1,
    flexDirection: "column"
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    marginBottom: 5
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#EAB31A",
    marginBottom: 5,
    marginHorizontal: 10
  },
  buttonStyleL: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 130,
    backgroundColor: "#EAB31A",
    marginBottom: 5,
    marginHorizontal: 10
  },
  btStyle: {
    fontSize: 18,
    fontFamily: "sans-serif",
    color: "white"
  }
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(withNavigation(Dashboard));