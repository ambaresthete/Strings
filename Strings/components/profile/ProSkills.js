import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text, Left, Right, Body } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Chip } from "react-native-paper";

export default class ProSkills extends Component {
  render() {
    const skills = this.props.skills.map((skill, i) => (
        <Chip key={i}>{skill}</Chip>
      
    ));
    return (
      <View style={{flexDirection:'row', marginTop: 20}}>
        {skills}
      </View>
    );
  }
}
