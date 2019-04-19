import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
import { View } from 'react-native';
import {List,ListItem,Text,Right,Left,Body} from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";


class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <ListItem key={exp._id}>
        <Body>
          <Text>{exp.title}</Text>
          <Text note>{exp.company}</Text>
          <Text note>
            {exp.from.slice(0, 4)}
            {"-"}
            {exp.to === null ? "Present" : exp.to.slice(0, 4)}
          </Text>
        </Body>
        <Right>
          <Icon
            name="delete"
            size={20}
            onPress={this.onDeleteClick.bind(this, exp._id)}
          />
        </Right>
      </ListItem>
    ));
    return (
      <View>
      <List>
      <ListItem itemDivider>
          <Text>Experience</Text>
      </ListItem>     
        {experience}
      </List>
        </View>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);