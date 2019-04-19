import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import {View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    let url = `http://192.168.43.175:5000/static/${post.avatar}`;
    return (
        <View>
          <Card style={{flex:0}}>
            <CardItem bordered style={{borderColor:'black'}}>
              <Left>
                <Thumbnail source={{uri: url }} />
                <Body>
                  <Text>{post.name}</Text>
                </Body>
              </Left>
              <Right>
                {post.user === auth.user.id ? (
                  <Icon name="trash" onPress={this.onDeleteClick.bind(this, post._id)}/>

                ):null}
              </Right>
            </CardItem>
            <CardItem bordered style={{borderColor:'black'}}>
              <Text>{post.text}</Text>
            </CardItem>
            
            {showActions ? (
              <CardItem bordered style={{borderColor:'black'}}>
              <Left>
                <Button onPress={this.onLikeClick.bind(this, post._id)} transparent>
                  <Icon active={this.findUserLike(post.likes)?true:false} name="thumbs-up" />
                  <Text>{post.likes.length}</Text>
                </Button>
                <Button onPress={this.onUnlikeClick.bind(this, post._id)} transparent>
                  <Icon active={false} name="thumbs-down" />
                </Button>
              </Left>
              </CardItem>
            ):null}
            
          </Card>
          </View>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);