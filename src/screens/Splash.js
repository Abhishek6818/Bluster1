import { View, Text ,Image} from 'react-native'
import React ,{useEffect} from 'react'


const Splash =  ({navigation}) =>{
    useEffect (()=>{
        setTimeout (()=>{
            navigation.replace('Login');
        },700);
    },[]);
  return (
    <View >
        <Image source={require('../assets/splash.jpg')} style={{height:"100%", width:"100%",alignSelf:'center'}}/>
    </View>
    
  );
};

export default Splash;