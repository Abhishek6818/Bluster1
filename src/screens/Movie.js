import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://freetestapi.com/api/v1/movies');
      console.log("Fetched Data:", res.data);

      if (Array.isArray(res.data)) {
        const filteredMovies = res.data.map(movie => ({
          title: movie.title || "N/A",
          year: movie.year || "N/A",
          director: movie.director || "N/A",
          poster: movie.poster || movie.image || "https://via.placeholder.com/150",
          runtime: movie.runtime || "N/A",
          award: movie.award || "N/A",
          country: movie.country || "N/A",
          language: movie.language || "N/A",
          boxOffice: movie.boxOffice || "N/A"
        }));
        setMovies(filteredMovies);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.poster }} style={styles.image} />
      <Text style={styles.title}>{item.title} ({item.year})</Text>
      <Text style={styles.text}> Director: {item.director}</Text>
      <Text style={styles.text}> Runtime: {item.runtime}</Text>
      <Text style={styles.text}> Award: {item.award}</Text>
      <Text style={styles.text}> Country: {item.country}</Text>
      <Text style={styles.text}> Language: {item.language}</Text>
      <Text style={styles.text}> Box Office: {item.boxOffice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movies List</Text>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loadingText}>Loading...</Text>
        </>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#c9f2e7" },
  header: { fontSize: 24, fontWeight: "bold", color: 'black', marginBottom: 20, textAlign: "center" },
  loadingText: { textAlign: "center", marginTop: 10, color: "black" },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 15, color: "#555", marginTop: 5 },
});

export default Movie;
