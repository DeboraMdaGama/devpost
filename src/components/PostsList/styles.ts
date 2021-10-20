import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        marginVertical:8,
        marginHorizontal:'2%',
        backgroundColor:'#fff',
        padding:11,
        borderRadius:8,
        shadowColor:'rgba(18,18,18,0.8)',
        shadowRadius:2,
        elevation:3
    },
    header:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
    },
    image:{
        width:40,
        height:40,
        borderRadius:20,
    },
    nameText:{
        color:'#353840',
        fontSize:20,
        fontWeight:'bold'
    },
    contentText:{
        color:'#353840',
        fontSize:18,
    },
    likeContainer:{
        flexDirection:'row',
        alignItems:"baseline",
        justifyContent:'space-between'
    },
    likeButton:{
        width:45,
        marginTop:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    
    likes:{
        color:'#e52246',
        marginHorizontal:6
    },
    
    timePost:{
        marginRight:6
    },
})