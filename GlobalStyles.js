import { Platform, StatusBar } from "react-native";

export const GlobalStyles = {
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
};
