import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Training from "./Tabs/training/Training";
import Agenda from "./Tabs/agenda/Agenda";
import FindPersonal from "./Tabs/find-personal/FindPersonal";
import Account from "./Tabs/account/Account";

export default function Home() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#2E2E2E",
          },
          tabBarActiveTintColor: "#FFD25A",
          tabBarInactiveTintColor: "#fff",
          tabBarIcon: ({ focused }) => {
            let tabs: any = {
              Treinos: "dumbbell",
              Agenda: "calendar-month",
              Personal: "arm-flex",
              Account: "account",
            };
            return (
              <Icon
                name={tabs[route.name]}
                color={focused ? "#FFD25A" : "#fff"}
                size={26}
              />
            );
          },
        })}
      >
        <Tab.Screen
          options={() => ({
            tabBarIconStyle: {
              marginBottom: -4,
              marginRight: 4,
            },
          })}
          name="Treinos"
          component={Training}
        />
        <Tab.Screen name="Agenda" component={Agenda} />
        <Tab.Screen name="Personal" component={FindPersonal} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
