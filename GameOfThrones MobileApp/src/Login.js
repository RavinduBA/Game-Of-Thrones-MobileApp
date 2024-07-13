import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = async (email, password) => {
        // Trim email and validate format
        email = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Dashboard');
        } catch (error) {
            setErrorMessage('Email or password is incorrect');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email.trim())
            .then(() => {
                alert('Password reset email has been sent to your email address');
            }).catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 26, color: 'white' }}>My App</Text>

            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Email'
                    placeholderTextColor="#C0C0C0"
                    onChangeText={(email) => {
                        setEmail(email);
                        setErrorMessage('');
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Password'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(password) => {
                            setPassword(password);
                            setErrorMessage('');
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={!showPassword}
                        value={password}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.visibilityIcon}>
                        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <TouchableOpacity onPress={forgetPassword}>
                <Text style={{ fontSize: 14, color: 'white', left: 110, bottom: 6 }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFD482', left: 85, top: 202, textDecorationLine: 'underline' }}>Signup</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', right: 30, top: 180 }}>Don't have an account?</Text>
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
        zIndex: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
