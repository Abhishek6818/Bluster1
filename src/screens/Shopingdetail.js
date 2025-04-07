import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute,useNavigation} from '@react-navigation/native';
import styles from '../components/Styles';
import { AirbnbRating } from 'react-native-ratings';

const Shopingdetail = () => {
    const navigation=useNavigation();
    const route = useRoute();
    const details = route.params?.data;

    useEffect(() => {
        console.log('data', details);
    }, []);

    return (
        
        <SafeAreaView style={styles.container}>
            {details?.image && (
                <Image source={details.image} style={{ height: 350, width: 350, resizeMode: "contain", alignSelf: "center", marginTop: 20 }}/>
            )}
            <Text style={{ fontSize: 26, fontWeight: "900", textAlign: "left", color: "black", marginTop: 15, paddingLeft: 10 }}>
                {details?.title}
            </Text>
            <View style={{ alignItems: "flex-start", padding: 10 }}>
                {details?.rating && (
                    <AirbnbRating
                        count={5}
                        defaultRating={details.rating}
                        size={35}
                        showRating={false}
                        selectedColor="gold"
                        isDisabled={true}
                        starContainerStyle={styles.starContainer}
                    />
                )}
            </View>
            <Text style={{ fontSize: 30, paddingLeft: 10 }}>₹ <Text style={{ fontWeight: "900", color: "black" }}>{details?.rate}</Text></Text>
            <Text style={{ fontSize: 18, color: "black", marginTop: 10, paddingLeft: 10 }}>{details?.text}</Text>
        </SafeAreaView>
    
    );
};

export default Shopingdetail;
