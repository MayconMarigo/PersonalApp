import { Platform, StatusBar, useColorScheme } from "react-native";

export const GlobalStyles = {
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
};
