import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function Start({ setUserName }) {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    if (inputValue) {
      setUserName(inputValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>A Fistful</Text>
        </View>
        <View>
          <Text style={styles.title2}>of Destiny</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter a nickname"
            placeholderTextColor="#fff"
            style={styles.startInput}
            value={inputValue}
            onChangeText={setInputValue}
            caretHidden={true}
          />
          <TouchableOpacity onPress={handleClick} style={styles.button}>
            <AntDesign name="arrowright" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#02281F",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 60,
  },
  titleContainer: {
    backgroundColor: "#7E57C2",
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-5deg" }],
  },
  title1: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    transform: [{ rotate: "5deg" }],
  },
  title2: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFC107",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  startInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#02281F",
    color: "#fff",
    fontSize: 15,
    paddingLeft: 15
  },
  button: {
    paddingRight: 10,
  },
});