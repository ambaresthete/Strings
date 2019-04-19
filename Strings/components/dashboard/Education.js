import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profileActions';
import { View} from 'react-native';
import {List,ListItem,Text,Left,Right,Body} from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";


class Education extends Component {
  onDeleteClick(id){
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <ListItem key={edu._id}>
        <Body>
          <Text>{edu.college}</Text>
          <Text note>{edu.degree}</Text>
          <Text note>
            {edu.from.slice(0, 4)}
            {"-"} {edu.to === null ? "Present" : edu.to.slice(0, 4)}
          </Text>
        </Body>
        <Right>
          <Icon
            name="delete"
            size={20}
            onPress={this.onDeleteClick.bind(this, edu._id)}
          />
        </Right>
      </ListItem>
    ));
    return (
      <View>
      <List>
      <ListItem itemDivider>
          <Text>Education</Text>
      </ListItem>     
        {education}
      </List>
        </View>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);