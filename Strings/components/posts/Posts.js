import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';
import {View, ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import CustomHeader from '../custom/CustomHeader';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
      postContent = (
      <View style={styles.body}>
      <ActivityIndicator animating={true} color="black" />
      </View>
      );
    } else {
      postContent = (
      <View style={{marginTop:10}}>
      <PostFeed posts={posts} />
      </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
        <CustomHeader title="Posts" navigation={this.props.navigation} onPress={() => console.log("huehue")} />
        </View>
        <View style={styles.disbody}>
        <ScrollView>
              <PostForm />
              {postContent}
        </ScrollView>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3"
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  disbody:{
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 5,
    marginTop: 5
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginBottom: 5
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAB31A',
    marginBottom: 5
  }
});

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);