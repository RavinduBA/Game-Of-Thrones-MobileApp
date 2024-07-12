// Purpose: Main file for the application. This file is responsible for the navigation of the application.
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import SplashScreen from './src/SplashScreen';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Settings from './src/Settings';

// Create a Stack Navigator
const Stack = createStackNavigator();

function App() {
  // State to handle the initialization process
  const [initializing, setInitializing] = useState(true);
  // State to store the current user information
  const [user, setUser] = useState();

  // Function to handle changes in authentication state
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // Set up an effect to subscribe to authentication state changes
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  // If the app is still initializing, return null to render nothing
  if (initializing) return null;

  // If no user is logged in, show the Login and Registration screens
  if (!user) {
    return (

      <Stack.Navigator>

        {/* Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide header for SplashScreen
        />
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,

          }}
        />
        {/* Registration Screen */}
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown: false,// Custom header component
          }}
        />
      </Stack.Navigator>
    );
  }

  // If a user is logged in, show the Dashboard screen
  return (
    <Stack.Navigator>
      {/* Dashboard Screen */}
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,// Custom header component
        }}
      />

      {/* Settings Screen */}
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,// Custom header component
          headerBackground: '#1E1E1E'
        }}
      />
    </Stack.Navigator>
  );
}

// Wrap the App component in NavigationContainer for navigation management
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
