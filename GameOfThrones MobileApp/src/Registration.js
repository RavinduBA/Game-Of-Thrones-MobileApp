import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../config';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons library

const Registration = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const registerUser = async (email, password, name) => {
        if (password !== confirmPassword) {
            alert("Passwords don't match. Please enter matching passwords.");
            return;
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://gameofthronesapp-795aa.firebaseapp.com',
            });
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                name,
                email,
            });
            alert('Verification email has been sent to your email address');
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>My App</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Name"
                    onChangeText={(name) => setName(name)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email Address"
                    onChangeText={(email) => setEmail(email)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.visibilityIcon}>
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#757575"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.visibilityIcon}>
                        <Ionicons
                            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#757575"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={() => registerUser(email, password, name)} style={styles.signupButton}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signinLink}>
                <Text style={styles.signinText}>Have an account? Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    appTitle: {
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 40,
    },
    formContainer: {
        width: '100%',
    },
    textInput: {
        height: 50,
        fontSize: 18,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    passwordInput: {
        height: 50,
        fontSize: 18,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    visibilityIcon: {
        position: 'absolute',
        top: 12,
        right: 16,
    },
    signupButton: {
        marginTop: 20,
        width: '100%',
        height: 50,
        backgroundColor: '#FFD482',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    signinLink: {
        marginTop: 20,
    },
    signinText: {
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#757575',
    },
});
