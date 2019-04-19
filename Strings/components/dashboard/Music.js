import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteMusic } from '../../actions/profileActions';
import { View} from 'react-native';
import {List,ListItem,Text,Left,Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Music extends Component {
  onDeleteClick(id){
    this.props.deleteMusic(id);
  }

  render() {
    const music = this.props.music.map(mus => (
     
            
                           
            <ListItem key={mus._id}>
            <Left>
              <Text>{mus.title}</Text><Icon name="play-arrow" size={25} onPress={() => this.props.navigation.push('player', {title:mus.title, filepath:"http://192.168.43.175:5000/static/" + mus.sound})}/>
              </Left>
              <Right>
              <Icon name="delete" size={20} onPress={this.onDeleteClick.bind(this,mus._id)}/>
              </Right>
            </ListItem>
          
      
    ));
    return (
      <View>
      <List>
      <ListItem itemDivider>
          <Text>Music</Text>
      </ListItem>     
        {music}
      </List>
        </View>
    );
  }
}

Music.propTypes = {
  deleteMusic: PropTypes.func.isRequired
};

export default connect(null, { deleteMusic })(Music);