import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons library

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Dashboard');
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //Forget Password

    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email has been sent to your email address');
            }).catch((error) => {
                alert(error);
            })
    };


    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 26, color: 'white' }}>My App</Text>

            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Password"
                        placeholderTextColor="#FFFFFF"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={!showPassword} // Toggle secure text entry based on showPassword state
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.visibilityIcon}>
                        {/* Eye icon for toggling password visibility */}
                        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="white" />
                    </TouchableOpacity>
                </View>

            </View>
            <TouchableOpacity onPress={() => { forgetPassword() }} style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 14, color: 'white', left: 110 }}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFD482', left: 85, top: 22 }}>Signup</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', right: 30 }}>Don't have an account?</Text>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 180,
        alignItems: 'center',
        backgroundColor: '#1E1E1E'
    },
    textinput: {
        padding: 10,
        width: 343,
        height: 64,
        fontSize: 14,
        marginBottom: 10,
        backgroundColor: '#3D3D3D',
        borderRadius: 10,
        color: 'white'

    },
    button: {
        height: 48,
        width: 345,
        backgroundColor: '#FFD482',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 10,
    },
    visibilityIcon: {
        position: 'absolute',
        right: 20,
        top: 18,
        zIndex: 1, // Ensure the icon is above the password input
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative', // Ensure the icon is positioned relative to this container
    },
});
