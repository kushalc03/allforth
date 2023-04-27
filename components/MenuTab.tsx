import React, {useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Switch,
  SafeAreaView,
  Linking,
} from 'react-native';
import AllforthMap from './AllforthMap';

const screenHeight = Dimensions.get('window').height;
const initialMenuHeight = screenHeight * 0.46;

const Option: React.FC<{
  label: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
}> = ({label, onValueChange, value}) => {
  return (
    <View style={styles.option}>
      <Text style={styles.optionText}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const MenuTab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const translateY = new Animated.Value(initialMenuHeight);
  const toggleMenu = () => {
    const toValue = open ? initialMenuHeight : screenHeight * 0.06;
    Animated.spring(translateY, {
      toValue: toValue,
      bounciness: 2,
      useNativeDriver: false,
    }).start(() => {
      setOpen(!open);
    });
  };

  const [switchStates, setSwitchStates] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleSwitch = (option: string, value: boolean) => {
    setSwitchStates({...switchStates, [option]: value});
  };

  return (
    <>
      <AllforthMap switchStates={switchStates} />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: translateY}],
          },
        ]}>
        <TouchableOpacity style={styles.menuBar} onPress={toggleMenu}>
          <Text style={styles.menuBarText}>Filter Resources By Category</Text>
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          <Option
            label="Food"
            value={switchStates.option1}
            onValueChange={value => handleSwitch('option1', value)}
          />
          <Option
            label="Housing"
            value={switchStates.option2}
            onValueChange={value => handleSwitch('option2', value)}
          />
          <Option
            label="Medical"
            value={switchStates.option3}
            onValueChange={value => handleSwitch('option3', value)}
          />
          <Option
            label="Addiction Recovery"
            value={switchStates.option4}
            onValueChange={value => handleSwitch('option4', value)}
          />
        </View>
        <Text
          style={{color: 'rgba(255,165,0,1)', textAlign: 'center'}}
          onPress={() =>
            Linking.openURL(
              'https://docs.google.com/forms/d/e/1FAIpQLSdb19lWzvYQZyx4tpoA7E9SlNgEhD3MfQbB3WoiBFu3_HWBCQ/viewform?usp=sf_link',
            )
          }>
          Feedback?
        </Text>
      </Animated.View>
    </>
  );
};

export default MenuTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: screenHeight * 0.55,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  menuBar: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,165,0,1)',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 16,
    color: 'white',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 5,
    color: 'white',
  },
  menuBarText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  menuBarTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
  },
  banner: {
    width: '100%',
    height: '20%',
    alignSelf: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});
