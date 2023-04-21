import React, {useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;

const MenuTab: React.FC = () => {
  const translateY = new Animated.Value(0);
  const [open, setOpen] = useState(false);

  const onGestureEvent = (event: any) => {
    translateY.setValue(event.nativeEvent.translationY);
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const slideMovement = event.nativeEvent.translationY;
      if (slideMovement < -50 && !open) {
        setOpen(true);
        Animated.timing(translateY, {
          toValue: -screenHeight * 0.5,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else if (slideMovement > 5 && open) {
        setOpen(false);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateY, {
          toValue: open ? -screenHeight * 0.7 : 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const toggleMenu = () => {
    Animated.timing(translateY, {
      toValue: open ? 0 : screenHeight, // Change this value to adjust the expanded height
      duration: 300,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const renderOption = (label: string) => (
    <TouchableOpacity style={styles.option}>
      <Text style={styles.optionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
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
        <TouchableOpacity style={styles.menuBar} onPress={toggleMenu} />
        <View style={styles.optionsContainer}>
          {renderOption('Medical')}
          {renderOption('Housing')}
          {renderOption('Fooding')}
          {renderOption('Addiction Recovery')}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default MenuTab;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: screenHeight * 0.2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  menuBar: {
    width: 40,
    height: 4,
    alignSelf: 'center',
    backgroundColor: '#aaa',
    borderRadius: 2,
    marginBottom: 8,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
  },
});
