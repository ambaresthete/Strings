import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text, Left, Right,Body } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { List } from 'react-native-paper';

export default class ProMusic extends Component {

  render() {
    const music = this.props.music.map(mus => (
      <ListItem key={mus._id}>
        <Body>
          <Text>{mus.title}</Text>
        </Body>
        <Right>
          <Icon
            name="play-arrow"
            size={25}
            onPress={() =>
              this.props.navigation.push("player", {
                title: mus.title,
                filepath: "http://192.168.43.175:5000/static/" + mus.sound
              })
            }
          />
        </Right>
      </ListItem>
    ));
    return (
      <View>
        <List.Accordion
          style={{ color: "black", backgroundColor: "#EAB31A" }}
          title="Music"
        >
          {music}
        </List.Accordion>
      </View>
    );
  }
}

