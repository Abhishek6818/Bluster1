import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Stacknavigator from './src/navigation/Stacknavigator';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      if (
        granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED &&
        granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
        granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
        granted["android.permission.ACCESS_FINE_LOCATION"] ===PermissionsAndroid.RESULTS.GRANTED

      ) {
        console.log("All permissions granted");
      } else {
        console.log("Permissions denied");
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
    const photoLibraryPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

    if (
      cameraPermission === RESULTS.GRANTED &&
      photoLibraryPermission === RESULTS.GRANTED
    ) {
      console.log("iOS permissions granted");
    } else {
      console.log("iOS permissions denied");
    }
  }
};

const App = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stacknavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

