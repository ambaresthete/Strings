import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedLocation: {
        latitude: 17.3850,
        longitude: 78.4867,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },
      locationChosen: false
    };

    this.mapRef = null;

    this.pickLocationHandler = this.pickLocationHandler.bind(this);
    this.getDeviceLocation = this.getDeviceLocation.bind(this);
    this.getPermission = this.getPermission.bind(this);
  }

  getPermission() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
  .then(data => {
    console.log("good");
  }).catch(err => {
    console.log("error");
  });
  this.getDeviceLocation();
  }

  getDeviceLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };

        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.error(err);
      }
    );
  }

  pickLocationHandler(event) {
    const { nativeEvent: { coordinate } } = event;

    this.setState(prevState => {
      const newCoordinates = {
        ...prevState.focusedLocation,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      };
      this.mapRef.animateToRegion(newCoordinates);
      this.props.onLocationPick({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      });
      return {
        focusedLocation: newCoordinates,
        locationChosen: true
      };

    });
  }

  render() {
    const { focusedLocation, locationChosen } = this.state;
    let marker = null;

    if (locationChosen) {
      marker = <MapView.Marker coordinate={focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          ref={ref => (this.mapRef = ref)}
          initialRegion={focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >
          {marker}
        </MapView>

        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getPermission} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: 200,
    height: 200
  },
  button: {
    margin: 10
  }
});

export default LocationInput;