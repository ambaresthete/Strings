import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import { View, StyleSheet,Button, ScrollView, Image,TouchableOpacity,Text } from 'react-native';
import { Picker } from 'native-base';
import { TextInput, HelperText} from 'react-native-paper';
import CustomHeader from '../custom/CustomHeader';
import ImagePicker from 'react-native-image-picker';
import LocationInput from "../custom/LocationInput";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      displaypic: null,
      latitude: null,
      longitude: null,
      contact: "",
      role: "",
      status: "",
      skills: "",
      bio: "",
      twitter: "",
      facebook: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.role = !isEmpty(profile.role) ? profile.role : '';
      profile.displaypic = !isEmpty(profile.displaypic) ? profile.displaypic : null;
      profile.latitude = !isEmpty(profile.location.latitude)
        ? profile.location.latitude
        : "";
      profile.longitude = !isEmpty(profile.location.longitude)
        ? profile.location.longitude
        : "";  
      profile.status = !isEmpty(profile.status) ? profile.status : '';
      profile.contact = !isEmpty(profile.contact) ? profile.contact : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        role: profile.role,
        displaypic: profile.displaypic,
        status: profile.status,
        latitude: profile.latitude,
        longitude: profile.longitude,
        contact: profile.contact,
        skills: skillsCSV,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit = e => {
    

    const profileData = {
      handle: this.state.handle,
      role: this.state.role,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      contact: this.state.contact,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    const proData = this.createFormData(this.state.displaypic,profileData);

    this.props.createProfile(proData, this.props.navigation);
  }

  handleImage = () => {
  ImagePicker.showImagePicker({title:"Pick an Image"}, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    this.setState({
      displaypic: response,
    });
  }
});
  }

  createFormData = (photo, body) => {
  const data = new FormData();

  data.append("displaypic", {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri
      
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};


  render() {
    let url = `http://192.168.43.175:5000/static/${this.state.displaypic}`;
  
    return (
      <View style={styles.container}>
        <View>
          <CustomHeader
            title="Create Profile"
            navigation={this.props.navigation}
          />
        </View>
        <View style={styles.body}>
          <ScrollView>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Profile Username"
              value={this.state.handle}
              onChangeText={handle => this.setState({ handle: handle })}
              error={
                this.state.errors.handle ? this.state.errors.handle : null
              }
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.handle ? this.state.errors.handle : null
              }
            >
              {this.state.errors.handle}
            </HelperText>
            {this.state.displaypic && (
              <Image
                source={{ uri: url }}
                style={{
                  width: 200,
                  height: 200,
                  position: "relative",
                  alignSelf: "center"
                }}
              />
            )}
            <View style={styles.button}>
              <Button title="Choose Profile" onPress={this.handleImage} />
            </View>
            <LocationInput
              onLocationPick={location =>
                this.setState({
                  latitude: location.latitude,
                  longitude: location.longitude
                })
              }
            />
            <Picker
              note
              mode="dropdown"
              style={{ width: 300 }}
              selectedValue={this.state.role}
              onValueChange={role => this.setState({ role: role })}
            >
              <Picker.Item label="Select Role" value="0" />
              <Picker.Item label="Solo" value="Solo" />
              <Picker.Item label="Band" value="Band" />
            </Picker>
            <Picker
              note
              mode="dropdown"
              style={{ width: 300 }}
              selectedValue={this.state.status}
              onValueChange={status => this.setState({ status: status })}
            >
              <Picker.Item label="Select Professional Status" value="0" />
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Expert" value="Expert" />
            </Picker>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Skills"
              value={this.state.skills}
              onChangeText={skills => this.setState({ skills: skills })}
              error={
                this.state.errors.skills ? this.state.errors.skills : false
              }
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.skills ? this.state.errors.skills : false
              }
            >
              {this.state.errors.skills}
            </HelperText>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Short Bio"
              value={this.state.bio}
              onChangeText={bio => this.setState({ bio: bio })}
              error={this.state.errors.bio ? this.state.errors.bio : false}
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.bio ? this.state.errors.bio : false
              }
            >
              {this.state.errors.bio}
            </HelperText>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Twitter Profile URL"
              value={this.state.twitter}
              onChangeText={twitter => this.setState({ twitter: twitter })}
              error={
                this.state.errors.twitter
                  ? this.state.errors.twitter
                  : false
              }
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.twitter
                  ? this.state.errors.twitter
                  : false
              }
            >
              {this.state.errors.twitter}
            </HelperText>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Facebook Page URL"
              value={this.state.facebook}
              onChangeText={facebook =>
                this.setState({ facebook: facebook })
              }
              error={
                this.state.errors.facebook
                  ? this.state.errors.facebook
                  : false
              }
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.facebook
                  ? this.state.errors.facebook
                  : false
              }
            >
              {this.state.errors.facebook}
            </HelperText>

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Youtube Channel URL"
              value={this.state.youtube}
              onChangeText={youtube => this.setState({ youtube: youtube })}
              error={
                this.state.errors.youtube
                  ? this.state.errors.youtube
                  : false
              }
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.youtube
                  ? this.state.errors.youtube
                  : false
              }
            >
              {this.state.errors.youtube}
            </HelperText>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Instagram Page URL"
              value={this.state.instagram}
              onChangeText={instagram =>
                this.setState({ instagram: instagram })
              }
              error={
                this.state.errors.instagram
                  ? this.state.errors.instagram
                  : false
              }
            />
            <HelperText
              type="error"
              visible={
                this.state.errors.instagram
                  ? this.state.errors.instagram
                  : false
              }
            >
              {this.state.errors.instagram}
            </HelperText>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.buttonStyle}
              onPress={this.onSubmit}
            >
              <Text style={styles.btStyle}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
    marginHorizontal: 10,
    marginTop: 10
  },
  buttonStyle: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#EAB31A"
  },
  textInput: {
    height: 50
  },
  btStyle: {
    fontSize: 20,
    fontFamily: "sans-serif",
    color: "white"
  },
  button: {
    margin:10
  }
});

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withNavigation(CreateProfile)
);