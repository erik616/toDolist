import {
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    Pressable,
    SafeAreaView,
    TextInput,
    TouchableHighlight,
    Text
} from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";


export function ActionModal({ handleClose }) {
    const [task, setTask] = useState(undefined)

    const addTask = async () => {

        const newTask = {
            task,
            color: "default"
        }

        try {
            const response = await AsyncStorage.getItem("@tasks:task")
            const previusData = response ? JSON.parse(response) : []

            const data = [...previusData, newTask]

            await AsyncStorage.setItem("@tasks:task", JSON.stringify(data))
        } catch (error) {
            console.log(error);
        }

        handleClose(false)
    }

    return (
        <SafeAreaView style={styles.modalContainer}>
            <TouchableOpacity
                style={{ flex: 2, zIndex: 9 }}
                onPress={handleClose}
            ></TouchableOpacity>

            <View style={{ alignItems: 'center', flex: 2 }}>
                <View style={styles.modal}>
                    <Pressable>
                        <Ionicons
                            name='close'
                            size={32}
                            style={{ position: 'absolute', alignSelf: 'flex-end' }}
                            color="#fff"
                            onPress={handleClose}
                        ></Ionicons>
                    </Pressable>

                    <TextInput
                        style={styles.input}
                        placeholder='Qual a sua tarefa?'
                        placeholderTextColor="#F4CD56"
                        onChangeText={setTask}
                        value={task}
                    />

                    <TouchableHighlight
                        style={styles.button}
                        onPress={addTask}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "500", justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='add' size={20} color="#000" />
                            Criar
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modal: {
        zIndex: 99,
        backgroundColor: "#F4CD56",
        paddingHorizontal: 12,
        paddingVertical: 10,
        width: "80%",
        height: 160,
        borderRadius: 8,
    },
    input: {
        width: "100%",
        borderRadius: 4,
        backgroundColor: "#fff",
        height: 40,
        paddingLeft: 16,
        fontSize: 16,
        top: 38,
        color: "#8c8c8c",
        marginBottom: 20
    },
    button: {
        marginTop: 30,
        width: 80,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
})