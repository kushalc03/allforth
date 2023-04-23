import {PermissionsAndroid, Alert, Platform} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';

import MenuTab from './components/MenuTab';

function App(): JSX.Element {
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

  return <MenuTab />;
}

export default App;
