import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./styles";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import PostsList from "../../components/PostsList";

type IPosts = FirebaseFirestoreTypes.DocumentData

export default function Home(){
    const navigation = useNavigation()
    const [posts,setPosts]=useState<IPosts[]>([])
    const [loading,setLoading]=useState(true)
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        const subscriber = firestore().collection('posts')
        .orderBy('created','desc').onSnapshot( snapshot =>{
            const postList:IPosts[] = []

            snapshot.forEach(document =>{
                postList.push({
                    ...document.data(),
                    id:document?.id
                })
            })

            setPosts(postList)
            setLoading(false)
        })

        return ()=> subscriber()
    },[])

    return(
        <View style={styles.container}>
            <Header/>
            {
                loading ? (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size={50} color='#e52246'/>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist}
                        data={posts}
                        renderItem={({item})=> <PostsList data={item} userId={user?.uid}/>}
                    />
                )
            }
            
            <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate('NewPost')}>
                <Feather name='edit-2' color='#fff' size={25}/>
            </TouchableOpacity>
        </View>
    )
}