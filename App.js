import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Modal, Pressable, FlatList, Text, SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState, useRef, useCallback } from 'react';
import { ActionModal } from './src/components/ActionModal';

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  const [refreshing, setRefreshing] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [data, setData] = useState([])
  const previus = useRef(data)

  async function fetchDataTasks() {
    // const reset = await AsyncStorage.removeItem("@tasks:task")
    const response = await AsyncStorage.getItem("@tasks:task")
    const data = response ? JSON.parse(response) : []
    setData(data)

    console.log("Tarefas", data);
  }

  useEffect(() => {
    fetchDataTasks()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);

    fetchDataTasks()

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Modal
        animationType='slide'
        transparent={true}
        visible={showInput}
        onRequestClose={() => setShowInput(false)}
      >
        <ActionModal
          handleClose={() => setShowInput(false)}
        />
      </Modal>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowInput(true)}
      >
        <Ionicons name='add' size={26} />
      </TouchableOpacity>

      <View
        style={{ marginTop: 80, paddingLeft: 40 }}
      >
        <View
          style={{ height: 550, width: "90%" }}>
          {data.length === 0 ?
            <Text
              style={styles.title}
            >
              Ainda não há tarefas
            </Text> :
            <Text
              style={styles.title}
            >
              Tarefas
            </Text>
          }
          <FlatList
            data={data}
            renderItem={({ item, key }) => {
              return (
                <Text
                  style={{ backgroundColor: "#fff", marginVertical: 6, paddingVertical: 8, paddingHorizontal: 4, width: "100%", borderRadius: 4, height: 60 }} key={key}
                >
                  {item.task}
                </Text>
              )
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E4',
  },
  button: {
    height: 60,
    width: 60,
    position: 'absolute',
    right: 60,
    bottom: 140,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: "center",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      height: 10,
      width: 8
    },
    shadowOpacity: .2,
    shadowRadius: 8,
    elevation: 14,
  },
  title: { borderBottomColor: "#F4CD56", borderBottomWidth: 2, fontSize: 16, fontWeight: "500", marginBottom: 20 }
});
