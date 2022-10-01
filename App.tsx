import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "./GlobalStyles";

import Login from "./src/screens/login/Login";
import Register from "./src/screens/register/Register";

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
            // options={{
            //   headerShadowVisible: false,
            //   headerStyle: {
            //     backgroundColor: "#2E2E2E",
            //   },
            // }}
          />
        </LoginStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
