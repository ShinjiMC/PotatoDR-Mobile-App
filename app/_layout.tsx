import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useRef } from "react";
import "react-native-reanimated";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync(); // Evita ocultar automáticamente el splash

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isAppReady, setAppReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loaded) {
      // Iniciar animación de fade in cuando las fuentes están listas
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setAppReady(true);
          SplashScreen.hideAsync(); // Ocultar el splash screen de Expo
        }, 3000); // Esperar 3 segundos más antes de ir a la Home
      });
    }
  }, [loaded]);

  if (!loaded || !isAppReady) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            source={require("../assets/images/partial-react-logo.png")} // Cambia a tu logo
            style={styles.logo}
          />
          <Text style={styles.appName}>Mi App</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Fondo blanco
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});
