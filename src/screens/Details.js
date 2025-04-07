import { View, Text,ImageBackground } from 'react-native'
import React from 'react'

const Details = () => {
  return (
    <ImageBackground source={require('../assets/blue.jpg')} style={{flex:1}}>
    <View>
      <Text>Details</Text>
    </View>
    </ImageBackground>
  )
}

export default Details