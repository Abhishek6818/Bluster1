import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from './BottomTabs'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Shopingdetail from '../screens/Shopingdetail'
import Movie from '../screens/Movie'
import Maps from '../screens/Maps'
import Havebeen from '../screens/Havebeen'
import Splash from '../screens/Splash'



const Stack =createNativeStackNavigator()

const Stacknavigator = () => {
  return (
   <SafeAreaProvider>
    <Stack.Navigator screenOptions={{headerShown:false,}} initialRouteName='Splash'>
      <Stack.Screen name='Splash' component={Splash}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Signup' component={Signup}/>
      <Stack.Screen name='Shopingdetail' component={Shopingdetail}/>
      <Stack.Screen name='BottomTabs' component={BottomTabs}/>
      <Stack.Screen name='Movie' component={Movie}/>
      <Stack.Screen name='Maps' component={Maps}/>
      <Stack.Screen name='Havebeen' component={Havebeen}/>

    </Stack.Navigator>
   </SafeAreaProvider>
  )
}

export default Stacknavigator