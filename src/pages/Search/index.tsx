import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import Feather from 'react-native-vector-icons/Feather'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import SearchList from "../../components/SearchList";

type IUsers = FirebaseFirestoreTypes.DocumentData

export default function Search() {
    const [name, setName] = useState('')
    const [users, setUsers] = useState<IUsers[]>([])
    useEffect(() => {
        if (name === '' || name === undefined) {
            setUsers([])
            return
        }
        const subscriber = firestore().collection('users')
            .where('name', '>=', name)
            .where('name', '<=', name + "\uf8ff")
            .onSnapshot(snapshot => {
                const userList: IUsers[] = []

                snapshot.forEach(document => {
                    userList.push({
                        ...document.data(),
                        id: document?.id
                    })
                })

                setUsers(userList)
            })

        return () => subscriber()
    }, [name])
    return (
        <View style={styles.container}>

            <View style={styles.inputView}>
                <Feather name='search' size={20} color='#e52246' />
                <TextInput
                    style={styles.input}
                    placeholder='Procurando alguém?'
                    placeholderTextColor="#353840"
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SearchList data={item} />}
            />
        </View>
    )
}