import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./styles";
import * as Animatable from 'react-native-animatable';

export default function Login(){
    const {signUP,loadingAuth, signIN} = useContext(AuthContext)

    const [openLogInScreen, setOpenLogInScreen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function toggleLogin(){
        setOpenLogInScreen(!openLogInScreen)
        setEmail('')
        setName('')
        setPassword('')
    }
    function handleLogin(){
        if(email === '' || password===''){
            Alert.alert("Preencha todos os dados", "Você deixou campos em branco")
            return
        }
        signIN(email,password)
    }
    function handleSignUP(){
        if(email === '' || password==='' || name ===''){
            Alert.alert("Preencha todos os dados", "Você deixou campos em branco")
            return
        }
        signUP(email,password,name)
        
    }

    if(!openLogInScreen){
        return(
            <View style={styles.container}>
                <Animatable.Text style={styles.title} animation='flipInY'>
                    Dev<Text style={{color:'#e52246'}}>Post</Text>
                </Animatable.Text>
    
                <TextInput 
                    style={styles.input}
                    placeholder='seu.email@email.com'
                    value={email}
                    onChangeText={(value)=> setEmail(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='senha'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value)=> setPassword(value)}
                />
    
                <TouchableOpacity
                    style={styles.logInButton}
                    onPress={handleLogin}
                >
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#fff"/>
                        ) :
                        (
                            <Text style={styles.logInButtonText}>Acessar</Text>
                        )
                    }
                    
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.signUpButton}
                    onPress={()=>toggleLogin()}
                >
                    <Text style={styles.signUpButtonText}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Animatable.Text style={styles.title} animation='fadeInDown'>
                Dev<Text style={{color:'#e52246'}}>Post</Text>
            </Animatable.Text>

            <TextInput 
                style={styles.input}
                placeholder='Nome'
                value={name}
                onChangeText={(value)=> setName(value)}
            />
            <TextInput 
                style={styles.input}
                placeholder='seu.email@email.com'
                value={email}
                onChangeText={(value)=> setEmail(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry={true}
                value={password}
                onChangeText={(value)=> setPassword(value)}
            />

            <TouchableOpacity
                style={styles.logInButton}
                onPress={handleSignUP}
            > 
                {
                    loadingAuth ? (
                        <ActivityIndicator size={20} color="#fff"/>
                    ) :
                    (
                        <Text style={styles.logInButtonText}>Cadastrar</Text>
                    )
                }
               
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.signUpButton}
                onPress={()=>toggleLogin()}
            >
                <Text style={styles.signUpButtonText}>Já tenho uma conta</Text>
            </TouchableOpacity>
        </View>
    )
}