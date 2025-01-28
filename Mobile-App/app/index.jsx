import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Firebase imports
import { db } from "../data/firebase"; // import the db from your firebase.js
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Index() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosFromDB = [];
      querySnapshot.forEach((docItem) => {
        todosFromDB.push({ id: docItem.id, ...docItem.data() });
      });

      todosFromDB.sort((a, b) => b.createdAt - a.createdAt);

      setTodos(todosFromDB);
    });

    return () => unsubscribe();
  }, []);

  // Create
  const addTodo = async () => {
    if (text.trim()) {
      try {
        await addDoc(collection(db, "todos"), {
          title: text,
          completed: false,
          createdAt: Date.now(),
        });
        setText("");
      } catch (error) {
        console.log("Error adding doc: ", error);
      }
    }
  };

  // Update
  const toggleTodo = async (id, currentCompleted) => {
    try {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, { completed: !currentCompleted });
    } catch (error) {
      console.log("Error updating doc: ", error);
    }
  };

  // Delete
  const removeTodo = async (id) => {
    try {
      const docRef = doc(db, "todos", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log("Error deleting doc: ", error);
    }
  };

  // Render
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, item.completed && styles.completedText]}
        onPress={() => toggleTodo(item.id, item.completed)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}


