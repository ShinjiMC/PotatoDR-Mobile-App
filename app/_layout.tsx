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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Verdana: require("../assets/fonts/verdana.ttf"),
    Rows: require("../assets/fonts/Rows of Sunflowers.ttf"),
  });

  const [isAppReady, setAppReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setAppReady(true);
          SplashScreen.hideAsync();
        }, 3000);
      });
    }
  }, [loaded]);

  if (!loaded || !isAppReady) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.centeredContent, { opacity: fadeAnim }]}>
          <Image
            source={require("../assets/images/potatoDR-logo-clean.png")}
            style={styles.logo}
          />
          <Text style={[styles.appName, { fontFamily: "Rows" }]}>
            DR Potato
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerTitleStyle: { fontFamily: "Verdana" } }}>
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
    backgroundColor: "#fff",
  },
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: -20,
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Rows",
    textAlign: "center",
  },
  defaultText: {
    fontFamily: "Verdana",
  },
});
