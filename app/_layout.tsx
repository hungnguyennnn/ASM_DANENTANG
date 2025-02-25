import React from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';




import { useColorScheme } from '@/hooks/useColorScheme';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="ManChao" options={{ headerShown: false }} />
        <Stack.Screen name="ManDN" options={{ headerShown: false }} />
        <Stack.Screen name="ManDK" options={{ headerShown: false }} />
        <Stack.Screen name="ManChinh" options={{ headerShown: false }} />
        <Stack.Screen name="ManCoffeeData" options={{ headerShown: false }} />
        <Stack.Screen name="Admin" options={{ headerShown: false }} /> 
        <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} /> 
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
