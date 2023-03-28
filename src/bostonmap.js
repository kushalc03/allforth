import styles from '../styles/style';
import {MapView, Marker} from 'react-native-maps';
import {React, useQuery} from '@apollo/client';
import {
  FOOD_QUERY,
  MEDICAL_QUERY,
  HOUSING_QUERY,
  ADDICTION_QUERY,
} from './gql/Query';
import {Text, FlatList, Pressable} from 'react-native';

export default function BostonMap() {
  const bostonRegion = {
    latitude: 42.3601,
    longitude: -71.0589,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const data = useQuery(FOOD_QUERY);
  const housing = useQuery(HOUSING_QUERY);
  const addiction = useQuery(ADDICTION_QUERY);
  const medical = useQuery(MEDICAL_QUERY);

  return (
    // Testing things out, appears that the GraphQL queries are not working completely.
    <div>
      <h1>Food List</h1>
      {data.food.Sheet1.map(food => (
        <div key={food.Name}>
          <h2>{food.Name}</h2>
          <p>Address: {food.Address}</p>
          <p>Description: {food.BriefDescription}</p>
          <p>Cost: {food.Cost}</p>
          <p>Hours: {food.Hours}</p>
          <p>Latitude: {food.Latitude}</p>
          <p>Longitude: {food.Longitude}</p>
          <p>Phone Number: {food.PhoneNumber}</p>
          <p>Website: {food.Website}</p>
        </div>
      ))}
    </div>
  );

  // <MapView
  //   style={styles.map}
  //   initialRegion={bostonRegion}
  //   showsUserLocation={true}>
  //   <Marker coordinate={bostonRegion} />
  // </MapView>;
}
