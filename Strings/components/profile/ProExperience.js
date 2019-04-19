import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text, Right, Left, Body } from "native-base";
import { List } from 'react-native-paper';

export default class ProExperience extends Component {

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
      </ListItem>
    ));
    return (
      <View>
          <List.Accordion
            style={{color:'black',backgroundColor:'#EAB31A'}}
            title="Experience"
          >
            {experience}
          </List.Accordion>
      </View>
    );
  }
}



