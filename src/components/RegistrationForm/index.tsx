import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function RegistrationForm(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Dev<Text style={{color:'#e52246'}}>Post</Text>
            </Text>

            <TextInput 
                style={styles.input}
                placeholder='seu.email@email.com'
            />
            <TextInput
                style={styles.input}
                placeholder='senha'
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.logInButton}
            >
                <Text style={styles.logInButtonText}>Acessar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Criar uma conta</Text>
            </TouchableOpacity>
        </View>
    )
}