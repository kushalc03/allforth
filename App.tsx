import {
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Marker} from 'react-native-maps';
import React, {useState, useEffect} from 'react';

function App(this: any): JSX.Element {
  const [location, setLocation] = useState<any>(null);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs to access your location in order to show your current position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position.coords);
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          Alert.alert('Location permission denied.');
        }
      } else {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
          },
          error => Alert.alert(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // temporary example marker
  // will move this into a separate file to make collection of markers by category
  const bostonRegion = {
    latitude: 42.3601,
    longitude: -71.0589,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  // default initial region is Harvard Square
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={bostonRegion}
        showsUserLocation={true}>
        <Marker coordinate={bostonRegion} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
