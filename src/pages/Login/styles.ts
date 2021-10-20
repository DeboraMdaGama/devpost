import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#36393f',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'#fff',
        fontSize:55,
        fontWeight:'bold',
        fontStyle:'italic',
    },
    input:{
        width:'80%',
        backgroundColor:'#eee',
        padding:10,
        marginTop:10,
        borderRadius:7,
        fontSize:17
    },
    logInButton:{
        width:'80%',
        backgroundColor:'#418cfd',
        padding:10,
        marginTop:10,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    logInButtonText:{
        color:'#fff',
        fontSize:20
    },
    signUpButton:{
        width:'100%',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    },
    signUpButtonText:{
        color:'#ddd',
        fontSize:15
    }
})