import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';
import { View, ScrollView, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Button, TextInput, HelperText, Checkbox} from 'react-native-paper';
import { DatePicker } from 'native-base';
import CustomHeader from '../custom/CustomHeader';

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.navigation);
  }

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  setFromDate = (newDate) => {
    strdate = newDate.toString();
    this.setState({ from : strdate});
  }

  setToDate = (newDate) => {
    strdate = newDate.toString();
    this.setState({ to : strdate});
  }

  render() {
    const { errors } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <CustomHeader
            title="Add Experience"
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
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Company"
              value={this.state.company}
              onChangeText={company => this.setState({ company })}
              error={errors.company ? errors.company : null}
            />
            <HelperText
              type="error"
              visible={errors.company ? errors.company : null}
            >
              {errors.company}
            </HelperText>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Location"
              value={this.state.location}
              onChangeText={location => this.setState({ location })}
              error={errors.location ? errors.location : null}
            />
            <HelperText
              type="error"
              visible={errors.location ? errors.location : null}
            >
              {errors.location}
            </HelperText>
            <DatePicker
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="From Date"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "black" }}
              onDateChange={this.setFromDate}
              disabled={false}
            />

            <DatePicker
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="To Date"
              textStyle={
                this.state.disabled
                  ? { color: "#d3d3d3" }
                  : { color: "black" }
              }
              placeHolderTextStyle={
                this.state.disabled
                  ? { color: "#d3d3d3" }
                  : { color: "black" }
              }
              onDateChange={this.setToDate}
              disabled={this.state.disabled}
            />

            <Text>Present</Text>
            <Checkbox
              status={this.state.current ? "checked" : "unchecked"}
              onPress={this.onCheck}
            />

            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Job Description"
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              error={errors.description ? errors.description : null}
            />
            <HelperText
              type="error"
              visible={errors.description ? errors.description : null}
            >
              {errors.description}
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
  }
});

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withNavigation(AddExperience)
);