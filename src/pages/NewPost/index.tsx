import { useNavigation } from "@react-navigation/core";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { AuthContext } from "../../contexts/auth";

export default function NewPost(){
    const [posts, setPosts]=useState('')
    const navigation = useNavigation()
    const {user} = useContext(AuthContext)

    useLayoutEffect(()=>{
        const options = navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.shareButton}
                    onPress={()=> handlePost()}
                >
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                </TouchableOpacity>
            )
        })
    },[navigation,posts])

    async function handlePost(){
        if(posts===''){
            Alert.alert('Post inválido', 'Digite algum texto para ser publicado')
            return
        }

        let avatarUrl = null

        try {
            const response = await storage().ref('users').child(String(user?.uid)).getDownloadURL()
            avatarUrl = response
        } catch (error) {
            avatarUrl=null
        }

        await firestore().collection('posts').add({
            created: new Date(),
            content:posts,
            author: user?.name,
            likes:0,
            avatarUrl,
            userId:user?.uid
        })
        .then(()=>{
            setPosts('')
            Alert.alert('Post publicado com Sucesso')
        })
        .catch((error)=>{
            console.log(error)
        })
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder='O que está acontecendo?'
                placeholderTextColor='#ddd'
                multiline={true}
                maxLength={300}
                value={posts}
                onChangeText={(value)=>setPosts(value)}
                autoCorrect={false}
            />
        </View>
    )
}