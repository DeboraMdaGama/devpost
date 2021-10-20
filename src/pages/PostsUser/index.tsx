import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import { Text, View,ActivityIndicator,FlatList } from "react-native";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import {styles} from './styles'
import PostsList from "../../components/PostsList";
import { AuthContext } from "../../contexts/auth";

type IPosts = FirebaseFirestoreTypes.DocumentData

export default function PostsUser({route}:any){
    const navigation = useNavigation()
    const {user} = useContext(AuthContext)
    const [posts,setPosts]=useState<IPosts[]>([])
    const [loading,setLoading]=useState(true)

    const [title,setTitle]=useState(route.params.title)
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:title === ''? '': title
        })
    },[navigation,title])

    useEffect(()=>{
        const subscriber = firestore().collection('posts')
        .where('userId','==',route.params.userId)
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
        </View>
    )
}