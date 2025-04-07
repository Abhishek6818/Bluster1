import { View, Text, Image, ImageBackground, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [dogData, setDogData] = useState([]);

  useEffect(() => {
    handleDogApi();
  }, []);

  const handleDogApi = async () => {
    try {
      const res = await axios.get('https://dog.ceo/api/breed/hound/images');
      console.log('Dog Images:', res.data.message);
      setDogData(res.data.message); // Set only the message array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/blue.jpg')} style={{ flex: 1 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Dog Images</Text>
        <FlatList
        contentContainerStyle={{paddingBottom:50}}
          data={dogData} // Show only first 10 images for performance
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: '90%',
                height: 350,
                // resizeMode:"contain",
                margin: 10,
                borderRadius: 2,
                alignSelf: 'center',
              }}
            />
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Profile;
