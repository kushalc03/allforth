import {StyleSheet, Dimensions} from 'react-native';

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
  textCalloutBold: {
    fontWeight: 'bold',
    margin: 10,
  },
  textCallout: {
    margin: 10,
  },
  textCalloutAddress: {
    margin: 10,
    color: 'blue',
  },
});

export default styles;
