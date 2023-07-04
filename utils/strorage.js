import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";


export async function addTask(key){

}

export async function task(key){
    const tasks = await AsyncStorage.getItem(key)
    return JSON.parse(key) || []
}

export const tarefas = []