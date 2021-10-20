import React, { createContext, ReactNode, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData{
    loggedIn:boolean;
    user: IUser | undefined;
    signUP:(email:string,password:string,name:string)=>void;
    signIN:(email:string,password:string)=>void;
    loadingAuth:boolean;
    loadingScreen:boolean;
    signOUT:()=>void;
    setUser:(user:IUser)=>void;
    storageUser:(user:IUser)=>void
}

interface AuthProviderProps{
    children:ReactNode
}

interface IUser{
    uid:string;
    name:string;
    email:string;
}

export const AuthContext = createContext({} as AuthContextData)

export default function AuthProvider({children}:AuthProviderProps){
    const [user,setUser]=useState<IUser>()
    const [loadingScreen,setLoadingScreen] = useState(true)
    const [loadingAuth,setLoadingAuth] = useState(false)

    useEffect(()=>{
        async function loadStorage() {
            const storage = await AsyncStorage.getItem('devApp')

            if(storage){
                setUser(JSON.parse(storage))
                setLoadingScreen(false)
            }

            setLoadingScreen(false)
        }

        loadStorage()
    },[])

    async function signIN(email:string,password:string) {
        setLoadingAuth(true)
        await auth().signInWithEmailAndPassword(email,password)
        .then(async(value)=>{
            const uid = value.user.uid
            const userData = await firestore().collection('users').doc(uid).get()
            const data:IUser = {
                uid:uid,
                name:userData.data()?.name,
                email:String(value.user.email)
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
        })
    }

    async function signUP(email:string,password:string,name:string) {
        setLoadingAuth(true)
        await auth().createUserWithEmailAndPassword(email,password)
        .then(async (value)=>{
            const uid = value.user.uid;
            await firestore().collection('users').doc(uid).set({
                name:name
            })
            .then(()=>{
                const data:IUser = {
                    uid:uid,
                    name:name,
                    email:String(value.user.email)
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
            })
        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
        })
    }

    async function signOUT() {
        await auth().signOut()
        await AsyncStorage.clear().then(()=>{
            setUser(undefined)
        })
    }

    async function storageUser(data:IUser) {
        await AsyncStorage.setItem('devApp',JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={{
            loggedIn:!!user,
            user, 
            signUP,
            loadingAuth,
            signIN,
            loadingScreen,
            signOUT,
            setUser,
            storageUser
        }}>
            {children}
        </AuthContext.Provider>
    )

}