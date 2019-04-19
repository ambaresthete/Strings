import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text, Left, Right, Body } from "native-base";
import { List } from 'react-native-paper';

export default class ProEducation extends Component {

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
      </ListItem>
    ));
    return (
      <View>
        <List.Accordion
          style={{ color: "black", backgroundColor: "#EAB31A" }}
          title="Education"
        >
          {education}
        </List.Accordion>
      </View>
    );
  }
}
