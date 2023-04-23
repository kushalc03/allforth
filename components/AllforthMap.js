import React from 'react';
import {View} from 'react-native';
import styles from '../styles/StyleSheet';
import MapView from 'react-native-maps';

import {MapAddictionRecoveryMarkers} from './markerMaps/MapAddictionRecoveryMarkers';
import {MapFoodMarkers} from './markerMaps/MapFoodMarkers';
import {MapMedicalMarkers} from './markerMaps/MapMedicalMarkers';
import {MapHousingMarkers} from './markerMaps/MapHousingMarkers';
import MenuTab from './MenuTab';

const initialRegion = {
  latitude: 42.3601,
  longitude: -71.0589,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const AllforthMap = ({MenuTab}) => {
  const addictionRecovery = mapMarkers.addictionRecovery;
  const food = mapMarkers.food;
  const medical = mapMarkers.medical;
  const housing = mapMarkers.housing;
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}>
        setMarkerView['addictionRecovery'] ? <MapAddictionRecoveryMarkers />
        setMarkerView['food'] ? <MapFoodMarkers />
        setMarkerView['medical'] ? <MapMedicalMarkers />
        setMarkerView['housing'] ? <MapHousingMarkers />
      </MapView>
    </View>
  );
};

export default AllforthMap;
