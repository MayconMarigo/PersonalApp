import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { HeaderProps } from "./interface";
import { useNavigation } from "@react-navigation/native";

export default function Header(props: HeaderProps) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
      }}
    >
      <TouchableOpacity>
        <Icon
          name={props.iconName}
          style={{ color: "white", fontSize: 24 }}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 22, marginLeft: 20 }}>
        {props.title}
      </Text>
    </View>
  );
}
