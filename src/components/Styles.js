import { Dimensions, StyleSheet, TextInput } from "react-native";

const screenWidth=Dimensions.get('window').width
const screenHeight=Dimensions.get('window').height
const styles=StyleSheet.create({
container:{
    height:screenHeight,
    width:screenWidth
},
txt0screen:{height:screenHeight,width:screenWidth,}
,
txt01:{textAlign:"center",color:"liteblack",fontSize:55,fontWeight:"800",paddingLeft:10,marginTop:"5%"}
,
txt1:{textAlign:"left",color:"liteblack",fontSize:21,fontWeight:"800",paddingLeft:10,marginTop:30}
,
txt2:{textAlign:"left",color:"black",fontSize:24,fontWeight:"800",paddingLeft:10,marginTop:30}
,
txtinput1:{width:"95%",alignSelf:'center',borderWidth:2,borderRadius:1,marginTop:40,paddingLeft:20,}
,
txtinput2:{width:"95%",alignSelf:'center',borderWidth:2,borderRadius:1,marginTop:"15%",paddingLeft:20,}
,
})
export default styles