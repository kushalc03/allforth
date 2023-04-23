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
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import AllforthMap from './AllforthMap';

const screenHeight = Dimensions.get('window').height;
const initialMenuHeight = screenHeight * 0.85;

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

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translateY}}],
    {
      useNativeDriver: true,
    },
  );

  const toggleMenu = () => {
    const toValue = open ? initialMenuHeight : 20;
    Animated.spring(translateY, {
      toValue: toValue,
      useNativeDriver: true,
    }).start();
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const translationY = event.nativeEvent.translationY;
      if (open) {
        if (translationY > 0) {
          Animated.spring(translateY, {
            toValue: initialMenuHeight,
            speed: 0.3,
            bounciness: 5,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateY, {
            toValue: 20,
            bounciness: 5,
            speed: 0.3,
            useNativeDriver: true,
          }).start();
        }
      } else {
        if (translationY < 0) {
          Animated.spring(translateY, {
            toValue: 20,
            bounciness: 5,
            speed: 0.3,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateY, {
            toValue: initialMenuHeight,
            speed: 0.3,
            bounciness: 5,
            useNativeDriver: true,
          }).start();
        }
      }
    }
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
    <SafeAreaView style={{flex: 1}}>
      <AllforthMap switchStates={switchStates} />
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <TouchableOpacity style={styles.menuBar} onPress={toggleMenu}>
            <Text style={styles.menuBarText}>Open Menu</Text>
          </TouchableOpacity>
          <View style={[styles.optionsContainer]}>
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
            style={{color: 'blue', textAlign: 'center'}}
            onPress={() =>
              Linking.openURL(
                'https://docs.google.com/forms/d/e/1FAIpQLSdb19lWzvYQZyx4tpoA7E9SlNgEhD3MfQbB3WoiBFu3_HWBCQ/viewform?usp=sf_link',
              )
            }>
            Feedback?
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
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
    height: screenHeight,
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: -50,
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
});
