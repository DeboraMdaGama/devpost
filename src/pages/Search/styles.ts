import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        paddingTop:15,
        flex:1,
        backgroundColor:'#353840'
    },
    inputView:{
        flexDirection:'row',
        margin:10,
        backgroundColor:'#f1f1f1',
        alignItems:'center',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:5
    },
    input:{
        width:'90%',
        backgroundColor:'#f1f1f1',
        height:40,
        paddingLeft:8,
        fontSize:17,
        color:'#121212'
    },
})