import React from 'react';
import {View} from 'react-native';
import styles from '../styles/StyleSheet';
import MapView from 'react-native-maps';

import {MapAddictionRecoveryMarkers} from './markerMaps/MapAddictionRecoveryMarkers';
import {MapFoodMarkers} from './markerMaps/MapFoodMarkers';
import {MapMedicalMarkers} from './markerMaps/MapMedicalMarkers';
import {MapHousingMarkers} from './markerMaps/MapHousingMarkers';

const initialRegion = {
  latitude: 42.3601,
  longitude: -71.0589,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const AllforthMap = () => {
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}>
        <MapAddictionRecoveryMarkers />
        <MapFoodMarkers />
        <MapMedicalMarkers />
        <MapHousingMarkers />
      </MapView>
    </View>
  );
};

export default AllforthMap;
