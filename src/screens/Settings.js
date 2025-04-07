import { View,Text,ImageBackground,Image,FlatList,ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Movie from './Movie';

const Settings = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation ();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://fake-json-api.mock.beeceptor.com/companies');
      console.log("Fetched Data:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.logo || "https://via.placeholder.com/150" }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.industry}>{item.industry}</Text>
      <Text style={styles.ceo}>CEO: {item.ceoName}</Text>
    </View>
  );
  

  return (
    <ImageBackground source={require('../assets/blue.jpg')} style={styles.background}>
        <View style={styles.container}>
               <TouchableOpacity  onPress={() => navigation.navigate("Movie")}>
                <Text style={{color:"blue",fontSize:20,padding:10}}>Go to Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Maps')}>
                  <Text style={{fontSize:20,color:"blue",paddingLeft:10}}>Go to Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Havebeen')}>
                  <Text style={{fontSize:20,color:"blue",paddingLeft:10,marginTop:10}}>Go to Havebeen</Text>
                </TouchableOpacity>

          <Text style={styles.header}>Companies List</Text>
          {loading?(
            <>
            <ActivityIndicator size="large" color="#000"/>
            <Text style={{ textAlign:"center",marginTop:10}}>Loading....</Text>
            </>
          ):(
            <FlatList
             data={products}
             keyExtractor={(item)=> item.id.toString()} 
             renderItem={renderItem}
            />
          )}
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  image: { width: '100%', height: 150, resizeMode: 'contain', borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  industry: { fontSize: 14, color: 'gray' },
  ceo: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
});

export default Settings;

// https://www.freetestapi.com/apis/movies