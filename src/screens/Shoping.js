import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

const Data = [
  { id: 1, image: require('../assets/la.jpg'), title: 'DELL 49.53 cm (19.5 inch) HD with Contrast Ratio 600:1...', rating: 4.3, rate: 5599, text: 'ADD TO CART' },
  { id: 2, image: require('../assets/la1.jpg'), title: 'DELL 68.58 cm (27 inch) Full HD LED Backlit VA Panel...', rating: 4.3, rate: 8999, text: 'ADD TO CART' },
  { id: 3, image: require('../assets/la2.jpg'), title: 'DELL S Series 68.58 cm (27 inch) Full HD IPS Panel...', rating: 4.4, rate: 11799, text: 'ADD TO CART' },
  { id: 4, image: require('../assets/la3.jpg'), title: 'DELL S-Series 60.96 cm (24 inch) Full HD LED...', rating: 4.2, rate: 9799, text: 'ADD TO CART' },
  { id: 5, image: require('../assets/la4.jpg'), title: 'DELL 60.96 cm (24 inch) Full HD LED Backlit VA Panel...', rating: 4.3, rate: 8499, text: 'ADD TO CART' },
  { id: 6, image: require('../assets/la5.jpg'), title: 'DELL 60.96 cm (24 inch) Full HD IPS Panel 99% sRGB...', rating: 4.3, rate: 14799, text: 'ADD TO CART' },
  { id: 7, image: require('../assets/la6.jpg'), title: 'DELL 68.58 cm (27 inch) Full HD IPS Panel Anti-Glare...', rating: 4.3, rate: 17399, text: 'ADD TO CART' },
  { id: 8, image: require('../assets/la7.jpg'), title: 'DELL 54.61 cm (21.5 inch) Full HD LED Backlit VA Panel...', rating: 4.3, rate: 6399, text: 'ADD TO CART' },
];

const Shoping = () => {
  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Shopingdetail', { data: item })}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.container}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        {item.rating && (
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={20}
            showRating={false}
            selectedColor="yellow"
            isDisabled={true}
            starContainerStyle={styles.starContainer}
          />
        )}
        <Text style={styles.rate}>₹{item.rate}</Text>
        {/* <Text style={styles.text}>{item.text}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../assets/blue.jpg')} style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3e9f5',
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  rate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  starContainer: {
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});

export default Shoping;
