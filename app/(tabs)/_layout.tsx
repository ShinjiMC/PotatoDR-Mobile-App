import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Asegúrate de importar useRouter

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); // Crear un hook de router

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopWidth: 0,
          height: 60,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Galería",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "images" : "images-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Cámara",
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.cameraButtonWrapper}
              onPress={() => router.push("/camera")} // Navegar a la ruta de cámara
            >
              <View style={styles.cameraIconWrapper}>
                <TabBarIcon
                  name="camera"
                  color={Colors[colorScheme ?? "light"].background}
                  size={32}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="my-app"
        options={{
          title: "Mi App",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "apps" : "apps-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cameraButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#eee",
    marginBottom: 20,
    zIndex: 1,
  },
  cameraIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.tint,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
