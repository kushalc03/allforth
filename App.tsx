import {PermissionsAndroid, Alert, Platform} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import BostonMap from './src/bostonmap';

import AllforthMap from './components/AllforthMap';

function App(this: any): JSX.Element {
  const [, setLocation] = useState<any>(null);

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

  // const initialRegion = {
  //   latitude: 42.3601,
  //   longitude: -71.0589,
  //   latitudeDelta: 0.1,
  //   longitudeDelta: 0.1,
  // };
  // default initial region is Harvard Square
  return (
    <AllforthMap />
    // <View style={styles.map}>
    //   <MapView
    //     style={styles.map}
    //     initialRegion={initialRegion}
    //     showsUserLocation={true}>
    //     {mapMedicalMarkers()}
    //     {mapFoodMarkers()}
    //     {mapAddictionRecoveryMarkers()}
    //     {mapHousingMarkers()}
    //   </MapView>
    // </View>
  );
}

export default App;
