import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StatusBar, StyleSheet, View, Text, Image } from "react-native";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const name = await AsyncStorage.getItem("username");
        if (name) {
          setUserName(name);
        }
      } catch (error) {}
    };

    fetchName();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#6C63FF" />
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            {/* Drawer Header with Avatar */}
            <View style={styles.drawerHeader}>
              <Image
                source={require("../../assets/images/avatar.jpg")} // ✅ Add this image to your assets folder
                style={styles.avatar}
              />
              <Text style={styles.headerText}>
                {userName ? `Welcome, ${userName}!` : "Welcome, Kiddo!"}
              </Text>
            </View>

            {/* Drawer Items */}
            <DrawerItemList {...props} />

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2025 Kids Learning</Text>
            </View>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          drawerActiveTintColor: "#6C63FF",
          drawerLabelStyle: {
            fontSize: 14,
          },
          drawerStyle: {
            backgroundColor: "#F8F9FA",
            width: "75%",
          },
          headerStyle: {
            backgroundColor: "#6C63FF",
          },
          headerTintColor: "#fff",
          drawerContentContainerStyle: {
            paddingTop: 0,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Kids Learning",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="pages/abc"
          options={{
            drawerLabel: "ABC",
            title: "ABC",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="alphabetical"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="pages/numbers"
          options={{
            drawerLabel: "Numbers",
            title: "Numbers",
            drawerIcon: ({ color, size }) => (
              <Octicons name="number" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="pages/onetwothree"
          options={{
            drawerLabel: "One Two Three",
            title: "One Two Three",
            drawerIcon: ({ color, size }) => (
              <Octicons name="number" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="pages/animals"
          options={{
            drawerLabel: "Animals",
            title: "Animals",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cat" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="pages/colors"
          options={{
            drawerLabel: "Colors",
            title: "Colors",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="color-palette" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="pages/shapes"
          options={{
            drawerLabel: "Shapes",
            title: "Shapes",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="shapes" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="pages/foods"
          options={{
            drawerLabel: "Foods",
            title: "Foods",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="food-apple"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="pages/poems"
          options={{
            drawerLabel: "Poems",
            title: "Poems",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="musical-note" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="pages/gk"
          options={{
            drawerLabel: "GK",
            title: "GK",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="pages/islamiat"
          options={{
            drawerLabel: "Islamiat",
            title: "Islamiat",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="mosque" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="pages/urdu"
          options={{
            drawerLabel: "Urdu",
            title: "Urdu",
            drawerIcon: ({ color, size }) => (
              <Entypo name="open-book" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="pages/test"
          options={{
            drawerLabel: "Test",
            title: "Test",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="draw" size={size} color={color} />
            ),
          }}
        />

                <Drawer.Screen
          name="pages/trace"
          options={{
            drawerLabel: "Trace",
            title: "Trace",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="draw" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="pages/about"
          options={{
            drawerLabel: "About Us",
            title: "About Us",
            drawerIcon: ({ color, size }) => (
              <Entypo name="info" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            drawerLabel: "Logout",
            title: "Logging Out...",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-out" size={size} color={color} />
            ),
            drawerItemStyle: { marginTop: "auto" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    backgroundColor: "#6C63FF",
    marginBottom: 8,
    borderRadius: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
});
