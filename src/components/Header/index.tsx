import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function Header(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Dev<Text style={{color:'#e52246'}}>Post</Text>
            </Text>
        </View>
    )
}