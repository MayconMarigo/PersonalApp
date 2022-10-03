import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Home() {
  const Tab = createBottomTabNavigator();

  const Home = () => (
    <View>
      <Text>Home</Text>
    </View>
  );

  const Home2 = () => (
    <View>
      <Text>Home</Text>
    </View>
  );

  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home2"
          component={Home2}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
