import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API Data
  useEffect(() => {
 

    fetchData();
  }, []);
  const fetchData =  async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products');
      console.log("Fetched Data:", res.data); // Debugging
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Ensure loading stops
    }
  };

  // Render each product item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image   source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.title}>{item.description}</Text>
      <Text style={styles.title}>{item.category}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>

      {loading ? (
        <>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ textAlign: 'center', marginTop: 10 }}>Loading...</Text>
        </>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#D3D3D3" },
  header: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 10, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
  image: { width: 200, height: 150, resizeMode: 'contain', borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  price: { fontSize: 14, color: 'green', marginTop: 3 },
});

export default Home;
