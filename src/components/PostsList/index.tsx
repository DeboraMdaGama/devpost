import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/core";
import * as Animatable from 'react-native-animatable';

const AnimatableMaterialCommunityIcons = Animatable.createAnimatableComponent(MaterialCommunityIcons)

export default function PostsList({ data, userId }: any) {
    const navigation = useNavigation()
    const iconRef = useRef<any>()
    function formatTimePost(){
        const datePost = new Date(data.created.seconds*1000)

        return formatDistance(
            new Date(),
            datePost,{
                locale:ptBR
            }
        )
    }
    async function handleLikes(id:string,likes:number){
        const documentId = `${userId}_${id}`
        iconRef?.current?.rubberBand()
        const document = await firestore().collection('likes')
        .doc(documentId).get()

        if(document.exists){
            await firestore().collection('posts').doc(id).update({
                likes:likes-1
            })
            await firestore().collection('likes').doc(documentId).delete()
            return
        }

        await firestore().collection('likes').doc(documentId).set({
            postId:id,
            userId:userId
        })

        await firestore().collection('posts').doc(id).update({
            likes:likes+1
        })
        
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header}  onPress={()=> navigation.navigate('PostsUser', {title:data.author, userId:data.userId})}>
                {
                    data.avatarUrl ?(
                        <Image source={{uri:data.avatarUrl}}
                            style={styles.image}
                        />
                    ):(
                        <Image source={require('../../assets/avatar.png')}
                            style={styles.image}
                        />
                    )
                }
                
                <Text style={styles.nameText}> {data?.author}</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.contentText}> {data?.content}</Text>
            </View>
            <View style={styles.likeContainer}>
                <TouchableOpacity  style={styles.likeButton} onPress={()=> handleLikes(data.id,data.likes)}>
                    <Text style={styles.likes}>{data?.likes === 0 ? '':data?.likes}</Text>
                    <AnimatableMaterialCommunityIcons 
                        name={data?.likes === 0 ? 'heart-plus-outline':'cards-heart'} 
                        size={20} 
                        color="#e52246"
                        ref={iconRef}
                    />
                </TouchableOpacity>
                <Text style={styles.timePost}>{formatTimePost()}</Text>
            </View>
        </View>
    )
}