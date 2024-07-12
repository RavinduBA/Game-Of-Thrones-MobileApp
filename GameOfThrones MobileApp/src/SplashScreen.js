import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a loading process or any initialization task
    setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login screen
    }, 2000); // Adjust the delay as needed
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A', // Background color
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Text color
  },
});

export default SplashScreen;
