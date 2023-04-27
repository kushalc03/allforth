import React from 'react';
import {View, Text, Linking} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {showLocation} from 'react-native-map-link';
import housingData from '../../data/Housing.json';
import styles from '../../styles/StyleSheet';

export function MapHousingMarkers() {
  return housingData.Sheet1.map(item => (
    <Marker
      key={item.Name}
      coordinate={{
        latitude: parseFloat(item.Latitude),
        longitude: parseFloat(item.Longitude),
      }}
      title={item.Name}
      description={item['Brief Description']}
      pinColor={'red'}>
      <Callout style={{width: 250}}>
        <View>
          <Text style={styles.textCalloutBold}>{item.Name.toUpperCase()}</Text>
          <Text
            style={styles.textCalloutAddress}
            onPress={() =>
              showLocation({
                latitude: item.Latitude,
                longitude: item.Longitude,
                title: item.Name,
              })
            }>
            {'\u{1F5FA}\u{FE0F}'} {item.Address}
          </Text>
          <Text
            style={styles.textCalloutAddress}
            onPress={() => Linking.openURL(`tel:${item['Phone Number']}`)}>
            {'\u{1F4DE}'} {item['Phone Number']}
          </Text>
          <Text style={styles.textCallout}>{item['Brief Description']}</Text>
          <View style={{flex: 0.1}} />
        </View>
      </Callout>
    </Marker>
  ));
}