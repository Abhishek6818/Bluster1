import { View, Text, TextInput, SafeAreaView, ImageBackground, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');

  // Error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateInputs = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 7 || password.length > 12) {
      setPasswordError('Password must be 7-12 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmpassword.trim()) {
      setConfirmPasswordError('Confirm your password');
      isValid = false;
    } else if (confirmpassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!phonenumber.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (phonenumber.length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  const handleSignup = () => {
    if (validateInputs()) {
      navigation.navigate('Login');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../assets/tc.jpg')} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
              <Text style={{ fontSize: 30, fontWeight: '900', alignSelf: 'center', padding: 10, marginTop: 10, color: '#030bfc' }}>Sign Up</Text>

              <Text style={styles.label}>UserName</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your username'
                placeholderTextColor={'black'}
                onChangeText={setName}
                value={name}
              />
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your Email'
                placeholderTextColor={'black'}
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your Password'
                placeholderTextColor={'black'}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                placeholderTextColor={'black'}
                onChangeText={setConfirmPassword}
                value={confirmpassword}
                secureTextEntry={true}
              />
              {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your Phone Number'
                placeholderTextColor={'black'}
                onChangeText={setPhoneNumber}
                value={phonenumber}
                keyboardType='numeric'
              />
              {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

              <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

// Styles
const styles = {
  input: {
    width: '85%',
    height: 55,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "black",
    fontSize: 17,
    padding: 5,
    marginTop: 7,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    paddingLeft: 30,
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    color: 'black',
    padding: 8,
    paddingLeft: 27,
    marginTop: 5,
    fontStyle: 'italic',
  },
  button: {
    width: "50%",
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
    color: '#030bfc',
    fontWeight: '900',
  },
};

export default Signup;
