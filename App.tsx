import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "./GlobalStyles";

import Login from "./src/screens/login/Login";
import Register from "./src/screens/register/Register";
import ResetPassword from "./src/screens/reset-password/ResetPassword";

import { useInterceptors } from "./src/services/axios/";
import Home from "./src/screens/home/Home";
import { ThemeProvider } from "styled-components";
import themes, { CustomThemeProps } from "./src/themes";

export default function App() {
  useInterceptors();
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
          <LoginStack.Navigator initialRouteName="Login">
            <LoginStack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <LoginStack.Screen
              name="Cadastrar"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <LoginStack.Screen
              name="ResetPw"
              component={ResetPassword}
              options={{
                headerShown: false,
              }}
            />
            <LoginStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </LoginStack.Navigator>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
}
