import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Modal, Text, View, TouchableOpacity, TextInput, Alert, Platform, KeyboardAvoidingView } from "react-native";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./styles";
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import ImagePicker, { MediaType,launchImageLibrary } from 'react-native-image-picker'

export default function Profile() {
    const { signOUT, user, setUser,storageUser } = useContext(AuthContext)
    const [url, setUrl] = useState<string|undefined>(undefined)
    const [username, setUsername] = useState(user?.name)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        async function loadingAvatarImg() {
            try {
                const response = await storage().ref('users').child(String(user?.uid))
                .getDownloadURL()
                setUrl(response)
            } catch (error) {
                console.log("nenhuma foto encontrada"+error)
            }
        }

        loadingAvatarImg()
    },[])

    async function handleUpdateProfile(){
        if(username===''){
            Alert.alert("Dados inválidos!","Não é possível atualizar com o campo em branco")
            return
        }
        
        await firestore().collection('users').doc(user?.uid).update({
            name:username
        })

        const postsDocument = await firestore().collection('posts')
        .where('userId','==',user?.uid).get()
        
        postsDocument.forEach(async document =>{
            await firestore().collection('posts').doc(document.id)
            .update({
                author:username
            })
        })

        const data = {
            uid:String(user?.uid),
            name:String(username),
            email:String(user?.email)
        } 

        setUser(data)
        storageUser(data)
        setIsOpen(false)
    }

    const uploadImage = () =>{
        const options = {
            noData:true,
            mediaType:'photo' as MediaType
        }

        launchImageLibrary(options, response=>{
            if(response.didCancel){
                console.log('Cancelou o modal')
            } else if(response.errorCode){
                console.log('Algo deu errado!'+response.errorCode)
            }else{
                uploadFileFirebase(response).then(()=>{
                    uploadAvatarImg()
                })
            }
        })
    }

    const getFileLocalePath = (response:any) =>{
        const {path,uri} = response.assets[0]
        return Platform.OS === 'android' ? uri : path
    }

    const uploadFileFirebase = async (response:any)  =>{
        const fileSource = getFileLocalePath(response)
        const storageRef = storage().ref('users').child(String(user?.uid))

        setUrl(fileSource)
        return await storageRef.putFile(fileSource)   
    }

    async function uploadAvatarImg() {
        const storageRef = storage().ref('users').child(String(user?.uid))
        const url = await storageRef.getDownloadURL().then(async image=>{
            const postsDocument = await firestore().collection('posts')
            .where('userId','==',user?.uid).get()

            postsDocument.forEach( async document =>{
                await firestore().collection('posts').doc(document.id).update({
                    avatarUrl:image
                })
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <View style={styles.container}>
            <Header />
            {
                url ? (
                    <TouchableOpacity style={styles.uploadButton}
                        onPress={uploadImage}
                    >
                        <Image source={{ uri: url }} style={styles.avatarImg} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.uploadButton}
                        onPress={uploadImage}
                    >
                        <Text style={styles.uploadText}>+</Text>
                    </TouchableOpacity>
                )
            }

            <Text style={styles.nameText}>{user?.name}</Text>
            <Text style={styles.emailText}>{user?.email}</Text>


            <TouchableOpacity style={[styles.buttons, { backgroundColor: '#428cfd' }]}
                onPress={() => setIsOpen(true)}
            >
                <Text style={[styles.buttonsTexts, { color: '#fff', fontStyle: 'italic' }]}>Atualizar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => signOUT()}>
                <Text style={styles.buttonsTexts}>Sair</Text>
            </TouchableOpacity>


            <Modal visible={isOpen} animationType='slide' transparent={true}>
                <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS==="android"?undefined:'padding'}>
                    <TouchableOpacity style={styles.goBackButton}
                        onPress={() => setIsOpen(false)}
                    >
                        <Feather name='arrow-left' size={22} color='#121212' />
                        <Text style={styles.buttonsTexts}>Voltar</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder={user?.name}
                        value={username}
                        onChangeText={(value)=>setUsername(value)}
                    />
                    <TouchableOpacity style={[styles.buttons, { backgroundColor: '#428cfd' }]}
                        onPress={handleUpdateProfile}
                    >
                        <Text style={[styles.buttonsTexts, { color: '#fff', fontStyle: 'italic' }]}>Atualizar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}