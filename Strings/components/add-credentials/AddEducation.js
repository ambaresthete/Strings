import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput, HelperText, Checkbox} from 'react-native-paper';
import { DatePicker } from 'native-base';
import CustomHeader from '../custom/CustomHeader';


class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      college: '',
      degree: '',
      field: '',
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

    const eduData = {
      college: this.state.college,
      degree: this.state.degree,
      field: this.state.field,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.navigation);
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
                <CustomHeader title="Add Education" navigation={this.props.navigation} />
              </View>
              
              <View style={styles.body}>
              <ScrollView>
              <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  label="College"
                  value={this.state.college}
                  onChangeText={(college) => this.setState({college})}
                  error={errors.college?errors.college:null}
                />
                <HelperText
                  type="error"
                  visible={errors.college?errors.college:null}
                >
                {errors.college}
                </HelperText>
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  label="Degree or Certification"
                  value={this.state.degree}
                  onChangeText={(degree) => this.setState({degree})}
                  error={errors.degree?errors.degree:null}
                />
                <HelperText
                  type="error"
                  visible={errors.degree?errors.degree:null}
                >
                {errors.degree}
                </HelperText>
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  label="Field of Study"
                  value={this.state.field}
                  onChangeText={(field) => this.setState({field})}
                  error={errors.field?errors.field:null}
                />
                <HelperText
                  type="error"
                  visible={errors.field?errors.field:null}
                >
                {errors.field}
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
                    textStyle={this.state.disabled?{ color: "#d3d3d3" }:{ color: "black" }}
                    placeHolderTextStyle={this.state.disabled?{ color: "#d3d3d3" }:{ color: "black" }}
                    onDateChange={this.setToDate}
                    disabled={this.state.disabled}
                  />
                  
                  <Text>Present</Text><Checkbox
                            status={this.state.current ? 'checked' : 'unchecked'}
                            onPress={this.onCheck}
                          />
                  
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  label="Course Description"
                  value={this.state.description}
                  onChangeText={(description) => this.setState({description})}
                  error={errors.description?errors.description:null}
                />
                  <HelperText
                    type="error"
                    visible={errors.description?errors.description:null}
                  >
                  {errors.description}
                  </HelperText>
                <TouchableOpacity activeOpacity={0.6} style={styles.buttonStyle} onPress={this.onSubmit}>
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withNavigation(AddEducation)
);