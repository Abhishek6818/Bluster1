import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/Styles';
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const showAlert = () => {
        Alert.alert('Alert', 'This is an alert!');
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validation = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('Email is required');
            isValid = false;
        } else if (!emailRegex.test(name.trim())) {
            setNameError('Please enter a valid email');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.trim().length < 7) {
            setPasswordError('Password must be at least 7 characters long.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validation()) {
            try {
                await AsyncStorage.setItem('userEmail', name);
                await AsyncStorage.setItem('userPassword', password);
                Alert.alert('Success', 'Login details saved!');
                navigation.navigate('BottomTabs');
            } catch (error) {
                Alert.alert('Error', 'Failed to save login details.');
            }
        }
    };

    return (
        <ImageBackground source={require('../assets/bluster.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.txt0screen}>
                    <Text style={{ fontStyle: "italic", fontSize: 33, textAlign: "center", color: "white", fontWeight: "900", marginTop: '10%' }}>
                        Bluster World
                    </Text>
                    <Text style={{ fontStyle: "normal", fontSize: 30, textAlign: "center", color: "white", fontWeight: "900", marginTop: '3%' }}>
                        Login
                    </Text>

                    {/* Email Input */}
                    <Text style={{ fontStyle: "normal", fontSize: 19, textAlign: "left", color: "white", fontWeight: "900", marginTop: 30, paddingLeft: 26 }}>
                        Your Email
                    </Text>
                    <TextInput
                        style={{
                            width: '85%',
                            height: 55,
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 12,
                            paddingLeft: 10,
                            marginTop: 10,
                            alignSelf: 'center',
                            fontSize: 20,
                        }}
                        placeholder="Enter your email"
                        onChangeText={(text) => setName(text)}
                        value={name}
                        keyboardType="email-address"
                        placeholderTextColor={"#f0dedd"}
                        autoCapitalize="none"
                    />
                    {nameError ? <Text style={{ fontSize: 18, fontWeight: "500", color: "red",paddingLeft:30}}>{nameError}</Text> : null}

                    {/* Password Input */}
                    <Text style={{ fontStyle: "normal", fontSize: 19, textAlign: "left", color: "white", fontWeight: "900", marginTop: 20, paddingLeft: 26 }}>
                        Your Password
                    </Text>
                    <TextInput
                        style={{
                            width: '85%',
                            height: 55,
                            color:"white",
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 12,
                            paddingLeft: 10,
                            marginTop: 10,
                            alignSelf: 'center',
                            fontSize: 20,
                        }}
                        placeholder="Enter your password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholderTextColor={'#f0dedd'}
                        secureTextEntry={true}
                    />
                    {passwordError ? <Text style={{ fontSize: 18, fontWeight: "500", color: "red" }}>{passwordError}</Text> : null}

                    {/* Forgot Password */}
                    <TouchableOpacity onPress={showAlert}>
                        <Text style={{ fontSize: 21, textAlign: 'right', color: "#fc3d03", fontWeight: "900", marginTop: 15, paddingRight: 26 }}>
                            Forgot password
                        </Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                            backgroundColor: "#52b6de",
                            width: "30%",
                            padding: 10,
                            alignSelf: "center",
                            marginTop: 20,
                            borderRadius: 12,
                            borderColor: "white",
                            borderWidth: 2,
                        }}
                    >
                        <Text style={{ color: "black", textAlign: "center", fontWeight: "800", fontSize: 22 }}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    {/* Google Login */}
                    <TouchableOpacity onPress={showAlert} style={{
                        // backgroundColor: "white",
                        width: "85%",
                        padding: 10,
                        alignSelf: "center",
                        marginTop: '15%',
                        borderRadius: 12,
                        borderColor: "white",
                        borderWidth: 2,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ImageBackground source={require('../assets/google.png')} style={{ width: 30, height: 30, marginRight: 10, marginEnd: '10%' }} />
                        <Text style={{ color: "#f9faf5", textAlign: "center", fontWeight: "800", fontSize: 19 }}>
                            Continue with Google
                        </Text>
                    </TouchableOpacity>

                    {/* Facebook Login */}
                    <TouchableOpacity onPress={showAlert} style={{
                        // backgroundColor: "white",
                        width: "85%",
                        padding: 10,
                        alignSelf: "center",
                        marginTop: '5%',
                        borderRadius: 12,
                        borderColor: "white",
                        borderWidth: 2,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ImageBackground source={require('../assets/fb.png')} style={{ width: 30, height: 30, marginRight: 10, marginEnd: '9%', marginLeft: '8%' }} />
                        <Text style={{ color: "#f9faf5", textAlign: "center", fontWeight: "800", fontSize: 19 }}>
                            Continue with Facebook
                        </Text>
                    </TouchableOpacity>

                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: "center" }}>
                        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '600', color: "white", marginTop: '5%' }}>
                            Don't have an account ?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{
                            alignSelf: "center",
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: "#0554f2", textAlign: "center", fontWeight: "800", fontSize: 20,marginTop:10,paddingLeft:10 }}>
                                Signup
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Login;
