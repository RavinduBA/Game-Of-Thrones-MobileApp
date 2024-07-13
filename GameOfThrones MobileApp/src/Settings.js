import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { firebase } from '../config';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            setUserInfo({ name: userDoc.data().name, email: user.email });
          } else {
            console.log('User document does not exist');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My App</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.userInfo}>{userInfo.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.userInfo}>{userInfo.email}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1E1E1E',

  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
    top: 100,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#C0C0C0',
    paddingTop: 12,
    paddingLeft: 15,
    width: 343,
    top: 190,
    zIndex: 5,
  },
  userInfo: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#3D3D3D',
    marginHorizontal: 10,
    paddingTop: 30,
    paddingLeft: 15,
    borderRadius: 12,
    width: 343,
    height: 64,
    top: 160,
  },
  button: {
    width: 345,
    height: 48,
    backgroundColor: '#FFD482',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 430,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
