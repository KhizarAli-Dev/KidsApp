import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkStoredLogin = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedUsername && storedPassword) {
        router.replace("/"); // auto-login
      }
    };
    checkStoredLogin();
  }, []);


  const handleLogin = async () => {
    if (
      (username === "Global" && password === "Ubaid@1234") ||
      (username === "Sos" && password === "Ubaid@1234")
    ) {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("loginTime", Date.now().toString()); // 🕒 Save login time
      Alert.alert("Login Successful", "Welcome to Kids Learning App!");
      router.replace("/");
    } else {
      Alert.alert("Error", "Invalid username or password.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg/loginbg2.jpg")}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>🎈 Welcome to Kids Learning</Text>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="person" size={24} color="#444" />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock" size={24} color="#444" />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Let's Go!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
