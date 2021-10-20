import React, { useContext } from "react"
import { View,Text, ActivityIndicator } from "react-native"

import AuthRoutes from "./auth.routes"
import AppRoutes from "./app.routes"
import { AuthContext } from "../contexts/auth"

export default function Routes(){
    const loadingScreen = false
    const {loggedIn} = useContext(AuthContext)

    if(loadingScreen){
        return(
            <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#36393f'
                }}
            >
                <ActivityIndicator size={50} color='#e52246'/>
            </View>
        )
    }

    return(
        loggedIn ? <AppRoutes/> : <AuthRoutes/>
    )
}