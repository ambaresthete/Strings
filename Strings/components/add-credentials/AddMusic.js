import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMusic } from '../../actions/profileActions';
import { View,Button, ScrollView, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {TextInput, HelperText, Checkbox} from 'react-native-paper';
import CustomHeader from '../custom/CustomHeader';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

class AddMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      sound: null,
      errors: {}
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const musicData = {
      title: this.state.title,
    };

    const muData = this.createFormData(this.state.sound,musicData);

    this.props.addMusic(muData, this.props.navigation);
  }

   handleSound = () => {
  // iPhone/Android
DocumentPicker.show({
      filetype: [DocumentPickerUtil.audio()],
    },(error,res) => {
      // Android
      console.log(res)
      this.setState({
        sound: res,
      });
    });

}

createFormData = (sound, body) => {
  const data = new FormData();
  if(sound){
  data.append("sound", {
    name: sound.fileName,
    type: sound.type,
    uri: sound.uri
      
  });
  }
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  
  return data;
}

  render() {
    const { errors } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <CustomHeader
            title="Add Music"
            navigation={this.props.navigation}
          />
        </View>

        <View style={styles.body}>
          <ScrollView>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Title"
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
              error={errors.title ? errors.title : null}
            />
            <HelperText
              type="error"
              visible={errors.title ? errors.title : null}
            >
              {errors.title}
            </HelperText>
            {this.state.sound && <Text style={{ position:"relative",alignSelf:"center"}}>{this.state.sound.fileName}{".mp3"}</Text>}
            <View style={styles.button}>
              <Button title="Choose Sound" onPress={this.handleSound} />
            </View>

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
    margin: 10
  }
});

AddMusic.propTypes = {
  addMusic: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addMusic })(
  withNavigation(AddMusic)
);