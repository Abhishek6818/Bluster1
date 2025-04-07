import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Havebeen = () => {
    const [breachData, setBreachData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('https://haveibeenpwned.com/api/v2/breaches');
            console.log('Fetched Data:', res.data);
            setBreachData(res.data);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.LogoPath }} style={styles.image} />
            <Text style={styles.text}><Text style={styles.label}>Name:</Text> {item.Name}</Text>
            <Text style={styles.text}><Text style={styles.label}>Title:</Text> {item.Title}</Text>
            <Text style={styles.text}><Text style={styles.label}>Domain:</Text> {item.Domain}</Text>
            <Text style={styles.text}><Text style={styles.label}>Breach Date:</Text> {item.BreachDate}</Text>
            <Text style={styles.text}><Text style={styles.label}>Added Date:</Text> {item.AddedDate}</Text>
            <Text style={styles.text}><Text style={styles.label}>Modified Date:</Text> {item.ModifiedDate}</Text>
            <Text style={styles.text}><Text style={styles.label}>Pwn Count:</Text> {item.PwnCount}</Text>
            <Text style={styles.description}>{item.Description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Breaches List</Text>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="black" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={breachData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#333',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#444',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
        color: '#222',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});

export default Havebeen;
