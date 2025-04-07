import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Details from '../screens/Details'
import Profile from '../screens/Profile'
import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Shoping from '../screens/Shoping'

const Tabs=createBottomTabNavigator()
const BottomTabs = () => {
  return (
  <Tabs.Navigator 
  screenOptions={({route})=>({
    tabBarActiveTintColor:"#000",
    tabBarStyle:{
      backgroundColor:"#D3D3D3",
      height:'8%',
      // marginTop:5
    },
    tabBarIcon:({color,size})=>{
      let iconName;
      if(route.name=== 'Home'){
        iconName=require('../assets/home.png')
        }else if (route.name === "Profile"){
          iconName=require('../assets/profile.png')
        } else if (route.name === "Details"){
          iconName=require('../assets/details.png')
        } else if (route.name === "Shoping"){
          iconName=require('../assets/shoping.png')
        } else if (route.name === "Settings"){
          iconName=require('../assets/setting.png')
        }
        return(
          <Image source={iconName}
          style={{resizeMode:"contain",height:25,width:25}}/>
        )
    }
  })}>
     <Tabs.Screen name='Home' component={Home} options={{headerShown:false,}} />
     <Tabs.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
     <Tabs.Screen name='Details' component={Details} options={{headerShown:false}}/>
     <Tabs.Screen name='Shoping' component={Shoping} options={{headerShown:false}}/>
     <Tabs.Screen name='Settings' component={Settings} options={{headerShown:false}}/>
  </Tabs.Navigator>
  )
}

export default BottomTabs