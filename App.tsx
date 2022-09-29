import { StatusBar } from "expo-status-bar";
import { Appearance, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "./GlobalStyles";
import * as NavigationBar from "expo-navigation-bar";

import Login from "./src/screens/login/Login";

export default function App() {
  NavigationBar.setBehaviorAsync("inset-swipe");

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Login />
    </SafeAreaView>
  );
}
