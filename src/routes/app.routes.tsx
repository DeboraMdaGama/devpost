import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Feather from 'react-native-vector-icons/Feather'
import { createStackNavigator } from "@react-navigation/stack";
import NewPost from "../pages/NewPost";
import PostsUser from "../pages/PostsUser";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function StackScreens(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="NewPost" component={NewPost} options={{
                headerTitle:'',
                headerTintColor:'#fff',
                headerStyle:{
                    backgroundColor:'#36393f'
                }
            }}/>
            <Stack.Screen name="PostsUser" component={PostsUser}options={{
                headerTintColor:'#fff',
                headerStyle:{
                    backgroundColor:'#36393f'
                }
            }}/>
        </Stack.Navigator>
    )
}

export default function AppRoutes(){
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard:true,
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle:{
                    backgroundColor:'#202225',
                    borderTopWidth:0,
                },
                tabBarActiveTintColor:'#fff',
            }}
        >
            <Tab.Screen name='HomeScreen' component={StackScreens}
                options={{
                    tabBarIcon:({color,size})=>{
                        return <Feather name='home' size={size} color={color}/>
                    }
                }}
            />
            <Tab.Screen name='Search' component={Search}
                options={{
                    tabBarIcon:({color,size})=>{
                        return <Feather name='search' size={size}  color={color}/>
                    }
                }}
            />
            <Tab.Screen name='Profile' component={Profile}
                options={{
                    tabBarIcon:({color,size})=>{
                        return <Feather name='user' size={size}  color={color}/>
                    }
                }}
            />
        </Tab.Navigator>
    )
}