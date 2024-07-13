import React, { useState, useEffect } from 'react';
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

    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    const validatePassword = (password) => {
        setHasLowercase(/[a-z]/.test(password));
        setHasUppercase(/[A-Z]/.test(password));
        setHasNumber(/[0-9]/.test(password));
        setHasMinLength(password.length >= 8);

        const isValid =
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            password.length >= 8;

        setIsPasswordValid(isValid);
    };

    const registerUser = async (email, password, name) => {
        if (password !== confirmPassword) {
            alert("Passwords don't match. Please enter matching passwords.");
            return;
        }

        if (!isPasswordValid) {
            alert('Password does not meet the required criteria.');
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
            // Navigate to login screen after successful registration
            navigation.navigate('Login'); // Change 'Login' to your actual login screen name if different
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
                    placeholderTextColor='#C0C0C0'
                    onChangeText={(name) => setName(name)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email Address"
                    placeholderTextColor='#C0C0C0'
                    onChangeText={(email) => setEmail(email)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor='#C0C0C0'
                        onChangeText={(password) => setPassword(password)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.visibilityIcon}>
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#C0C0C0"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        placeholderTextColor='#C0C0C0'
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.visibilityIcon}>
                        <Ionicons
                            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#C0C0C0"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordCriteriaContainer}>
                    <View style={styles.criteria}>
                        <Ionicons
                            name={hasLowercase ? 'checkmark-circle-outline' : 'close-circle-outline'}
                            size={20}
                            color={hasLowercase ? 'green' : 'red'}
                        />
                        <Text style={styles.criteriaText}>One lowercase character</Text>
                    </View>
                    <View style={styles.criteria}>
                        <Ionicons
                            name={hasUppercase ? 'checkmark-circle-outline' : 'close-circle-outline'}
                            size={20}
                            color={hasUppercase ? 'green' : 'red'}
                        />
                        <Text style={styles.criteriaText}>One uppercase character</Text>
                    </View>
                    <View style={styles.criteria}>
                        <Ionicons
                            name={hasNumber ? 'checkmark-circle-outline' : 'close-circle-outline'}
                            size={20}
                            color={hasNumber ? 'green' : 'red'}
                        />
                        <Text style={styles.criteriaText}>One number</Text>
                    </View>
                    <View style={styles.criteria}>
                        <Ionicons
                            name={hasMinLength ? 'checkmark-circle-outline' : 'close-circle-outline'}
                            size={20}
                            color={hasMinLength ? 'green' : 'red'}
                        />
                        <Text style={styles.criteriaText}>8 characters minimum</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => registerUser(email, password, name)}
                style={[
                    styles.signupButton,
                    !isPasswordValid && { backgroundColor: 'grey' },
                ]}
                disabled={!isPasswordValid}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.signinText2}>Have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signinLink}>
                <Text style={styles.signinText}>Sign in</Text>
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
        backgroundColor: '#1E1E1E',
    },
    appTitle: {
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 40,
        color: '#FFFFFF'
    },
    formContainer: {
        width: '100%',
    },
    textInput: {
        height: 50,
        fontSize: 14,
        height: 64,
        width: 345,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#3D3D3D',
        color: '#FFFFFF'
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    passwordInput: {
        height: 50,
        fontSize: 14,
        height: 64,
        width: 345,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#3D3D3D',
        color: '#FFFFFF'
    },
    visibilityIcon: {
        position: 'absolute',
        top: 12,
        right: 16,
    },
    passwordCriteriaContainer: {
        marginBottom: 20,
    },
    criteria: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    criteriaText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#FFFFFF'
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
        fontSize: 15,
        textDecorationLine: 'underline',
        color: '#FFD482',
        left:60,
    },
    signinText2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FFFFFF',
        top:41,
        right:28,
    },
});
