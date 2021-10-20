import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/core";

export default function SearchList({ data }: any) {
    const navigation = useNavigation()
    
    
    return (
        <TouchableOpacity style={styles.container}
            onPress={()=> navigation.navigate('PostsUser',{title:data.name, userId:data.id})}
        >
            <Text style={styles.nameText}>
                {data.name}
            </Text>
        </TouchableOpacity>
    )
}