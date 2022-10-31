import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "./GlobalStyles";

import Login from "./src/screens/login/Login";
import Register from "./src/screens/register/Register";
import ResetPassword from "./src/screens/reset-password/ResetPassword";

import Home from "./src/screens/home/Home";
import { ThemeProvider } from "styled-components";
import themes, { CustomThemeProps } from "./src/themes";

import "./src/services/axios";

export default function App() {
  const deviceTheme = useColorScheme();
  const LoginStack = createNativeStackNavigator();

  //@ts-ignore - device theme
  const theme: CustomThemeProps = themes[deviceTheme] || themes.light;
  //@ts-ignore
  NavigationBar.setBackgroundColorAsync(themes[deviceTheme].SAFE_AREA);
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          style={{
            ...GlobalStyles.AndroidSafeArea,
            //@ts-ignore
            backgroundColor: themes[deviceTheme].SAFE_AREA,
          }}
        >
          <LoginStack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          >
            <LoginStack.Screen name="Login" component={Login} />
            <LoginStack.Screen name="Cadastrar" component={Register} />
            <LoginStack.Screen name="ResetPw" component={ResetPassword} />
            <LoginStack.Screen name="Home" component={Home} />
          </LoginStack.Navigator>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
}
