import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileActions';
import CustomHeader from '../custom/CustomHeader';
import {View,StyleSheet,ImageBackground,TouchableOpacity,Dimensions} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Container,Button,Header, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon,Right,List,ListItem } from 'native-base';

class Profiles extends Component {

  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = (
        <View style={styles.body}>
      <ActivityIndicator animating={true} color="black" />
      </View>
      );
    } else {
      if (profiles.length > 0) {
        profileItems = (
          <View style={styles.disbody}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonStyleL}
                onPress={() =>
                  this.props.navigation.push("Location", {
                    profiles: profiles
                  })
                }
              >
                <Text style={styles.btStyleL}>Nearby Musicians</Text>
              </TouchableOpacity>
            <View style={{ marginTop: 60 }}>
              <DeckSwiper
                dataSource={profiles}
                renderItem={item => (
                  <Card style={{ elevation: 3 }}>
                    <CardItem
                      bordered
                      style={{ borderedColor: "black" }}
                    >
                      <Left>
                        <Thumbnail
                          source={{
                            uri:
                              "http://192.168.43.175:5000/static/" +
                              item.displaypic
                          }}
                        />
                        <Body>
                          <Text>{item.handle}</Text>
                          <Text note>{item.role}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem
                      bordered
                      style={{ borderedColor: "black" }}
                    >
                      <Body>
                        <Text>Name: {item.user.name}</Text>
                        <Text>Level: {item.status}</Text>
                        <Text>Bio: {item.bio}</Text>
                      </Body>
                      <Right>
                        <Text>Skills:</Text>
                        {item.skills.slice(0, 4).map((skill, index) => (
                          <Text key={index}>{skill}</Text>
                        ))}
                      </Right>
                    </CardItem>
                    <CardItem
                      bordered
                      style={{ borderedColor: "black" }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.buttonStyle}
                        onPress={() =>
                          this.props.navigation.push("Profile", {
                            profile_handle: item.handle
                          })
                        }
                      >
                        <Text style={styles.btStyle}>View Profile</Text>
                      </TouchableOpacity>
                    </CardItem>
                  </Card>
                )}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                position: "absolute",
                bottom: 50,
                left: 0,
                right: 0,
                justifyContent: "center",
                padding: 15
              }}
            >
              <Text>Swipe Left or Right to View Profiles</Text>
            </View>
          </View>
        );
      } else {
        profileItems = <Text>No profiles found...</Text>;
      }
    }


    return (
      <View style={styles.container}>
        <View>
        <CustomHeader title="Profiles" navigation={this.props.navigation} onPress={() => console.log("huehue")} />
        </View>
        {profileItems}
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
    resizeMode: "cover"
  },
  body: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  disbody: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 20
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    marginBottom: 5
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 40,
    backgroundColor: "#EAB31A",
    marginBottom: 5
  },
  buttonStyleL: {
    position: "relative",
    alignSelf: "center",
    width: 150,
    height: 40,
    backgroundColor: "#EAB31A",
    marginBottom: 5
  },
  btStyleL: {
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "white",
    position: 'relative',
    alignSelf: 'center',
    marginTop: 10
  },
  btStyle: {
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "white",
  }
});

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

