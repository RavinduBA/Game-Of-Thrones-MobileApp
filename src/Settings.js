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
    marginTop: 20,
    backgroundColor: '#3D3D3D',
    paddingTop:12,
    paddingLeft:10,
    width: 343,
    top: 150,
  },
  userInfo: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#3D3D3D',
    paddingTop: 1,
    paddingLeft: 10,
    paddingBottom: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    width: 343,
    top: 150,
  },
  button: {
    width: 345,
    height: 48,
    backgroundColor: '#FFD482',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 400,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
