import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#404349'
    },
    input:{
        backgroundColor:'transparent',
        margin:10,
        fontSize:20,
        color:'#fff'
    },
    shareButton:{
        backgroundColor:'#418cfd',
        marginRight:7,
        borderRadius:4,
        paddingVertical: 5,
        paddingHorizontal:12,
        alignItems:'center',
        justifyContent:'center'

    },
    shareButtonText:{
        color:'#fff',
        fontSize:16
    },
})