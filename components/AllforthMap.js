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

const AllforthMap = ({switchStates}) => {
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}>
        {switchStates.option1 ? <MapFoodMarkers /> : null}
        {switchStates.option2 ? <MapHousingMarkers /> : null}
        {switchStates.option3 ? <MapMedicalMarkers /> : null}
        {switchStates.option4 ? <MapAddictionRecoveryMarkers /> : null}
      </MapView>
    </View>
  );
};

export default AllforthMap;
