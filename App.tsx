import {View, PermissionsAndroid, Alert, Platform} from 'react-native';

import * as Realm from "realm-web";
import styles from './styles/style';
import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import BostonMap from './src/bostonmap';

function App(this: any): JSX.Element {
  const [, setLocation] = useState<any>(null);

  // Initialize Apollo Client
// Connect to your MongoDB Realm app
  const app = new Realm.App('allforth-cbfrg');
  // Gets a valid Realm user access token to authenticate requests
  async function getValidAccessToken() {
    // Guarantee that there's a logged in user with a valid access token
    if (!app.currentUser) {
      // If no user is logged in, log in an anonymous user. The logged in user will have a valid
      // access token.
      await app.logIn(Realm.Credentials.anonymous());
    } else {
      // An already logged in user's access token might be stale. Tokens must be refreshed after 
      // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
      await app.currentUser.refreshAccessToken();
    }

  const client = new ApolloClient({
    link: new HttpLink({
      uri: `https://realm.mongodb.com/api/client/v2.0/app/${allforth-cbfrg}/graphql`,
      // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
      // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
      // access token before sending the request.
      fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken();
        options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });

  // Location Permission
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

  return (
    <ApolloProvider client={client}>
      <View style={styles.map}>
        <BostonMap />
      </View>
    </ApolloProvider>
  );
}

export default App;
