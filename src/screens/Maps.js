import { View, Text, TextInput, Button, FlatList, TouchableOpacity,Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon  from'react-native-vector-icons/AntDesign'
import Iconss  from'react-native-vector-icons/Feather'
const OPEN_CAGE_API_KEY = "b157609c18b94c558cb640f90215d8b3";

const Maps = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const mapRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getUserLocation();
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

  // Fetch locations from OpenCage API
  const fetchLocationSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${OPEN_CAGE_API_KEY}&limit=5`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results) {
        setSuggestions(data.results);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  // Handle location selection
  const handleLocationSelect = (selectedLocation) => {
    const { lat, lng } = selectedLocation.geometry;
    const newLocation = { latitude: lat, longitude: lng };
    setLocation(newLocation);
    setSuggestions([]);
    setSearchQuery(selectedLocation.formatted);
  
    // Animate the map to the new location
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000); // duration in ms
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
    <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'center',
              borderWidth: 2,
              borderRadius: 5,
              borderColor: 'blue',
              marginTop: 20,
              paddingHorizontal: 10,
              }}>
      {/* Search Bar */}
      <TextInput
        style={{
          flex: 1,
          fontSize: 16,
          paddingVertical: 2,
        }}
        placeholder="Search location"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          fetchLocationSuggestions(text);
        }}
        />
        <TouchableOpacity
        onPress={()=>fetchLocationSuggestions(searchQuery)}
         >
          <Icon name="search1" size={24} color={'#000'} />
        {/* <Image source={require('../assets/search.png')}
        style={{ width:30,height:25}}/> */}
        </TouchableOpacity>
        </View>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleLocationSelect(item)}
              style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
            >
              <Text>{item.formatted}</Text>
            </TouchableOpacity>
          )}
          style={{ backgroundColor: 'white', position: 'absolute', top: 60, width: '95%', alignSelf: 'center', zIndex: 1 }}
        />
      )}

      {/* Map View */}
      {/* <Text style={{ textAlign: "center", padding: 5, fontSize: 22, marginTop: 5 }}>Maps</Text> */}

      <TouchableOpacity
        // {/* title={`Switch to ${mapType === 'standard' ? 'Hybrid' : 'Standard'} View`}
        // onPress={() => setMapType(mapType === 'standard' ? 'hybrid' : 'standard')} */}
        onPress={()=>{
          if (mapType==='standard') setMapType('hybrid');
          else setMapType('standard');
        }}
        style={{
          position:'absolute',
          top:100,
          right:20,
          zIndex:2,
          backgroundColor:'white',
          borderRadius:30,
          padding:10,
          elevation:5,
        }}
      >
        <Iconss name="layers" size={24} color={'#000'}/>
        {/* <Image source={require('../assets/stack.png')} style={{width:24,height:24}}/> */}
        </TouchableOpacity>
      {location && (
      <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType={mapType}
    >
          <Marker coordinate={location} title="Selected Location" />
        </MapView>
        
      )}
    </View>
  );
};

export default Maps;
