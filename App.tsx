import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "./GlobalStyles";

import Login from "./src/screens/login/Login";
import Register from "./src/screens/register/Register";
import ResetPassword from "./src/screens/reset-password/ResetPassword";
import Home from "./src/screens/home/Home";

export default function App() {
  NavigationBar.setVisibilityAsync("hidden");

  const LoginStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
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
    </NavigationContainer>
  );
}
