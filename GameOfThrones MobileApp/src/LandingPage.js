import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LandingPage = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/3.jpg')} 
      style={styles.container}
    >
      <Text style={styles.title}>Game of Thrones</Text>
      <Text style={styles.title2}> Encyclopedia</Text>
      <Text style={styles.subtitle}>Explore the World of Westeros</Text>
      <Text style={styles.description}>Discover the characters, families, and their stories.</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'black',
    top: 130,
    shadowColor: 'black',

  },
  title2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    top: 120,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD482',
    top:500,
  },
  description: {
    fontSize: 16,
    color: '#C0C0C0',
    marginBottom: 40,
    textAlign: 'center',
    top: 500,
  },
  button: {
    backgroundColor: '#EFC990',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    top: 470,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingPage;
