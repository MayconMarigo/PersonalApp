import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Icon from "react-native-vector-icons/AntDesign";
import { TrainingCardProps } from "./interface";

export default function TrainingCard(props: TrainingCardProps) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 250,
        backgroundColor: "#FFE15A",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 4,
      }}
    >
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          justifyContent: "center",
          backgroundColor: "#dedede",
          position: "relative",
        }}
      >
        <View
          style={{
            borderRadius: 999,
            backgroundColor: "#2E2E2E",
            marginLeft: 20,
            height: 110,
            width: 110,
          }}
        />
        <LinearGradient
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          locations={[0.55, 1]}
          colors={["transparent", "rgba(0,0,0,0.7)"]}
        />
      </View>
      <View
        style={{ height: "40%", padding: 20, justifyContent: "space-between" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 10 }}>PERSONAL • </Text>
          <Text>{props.personal}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>{props.training}</Text>
          <View
            style={{
              flexDirection: "row",
              width: 70,
              backgroundColor: "#fff",
              justifyContent: "space-around",
              padding: 5,
              paddingRight: 8,
              borderRadius: 16,
            }}
          >
            <Icon name="star" size={20} color="#FFE15A" />
            <Text>{props.value}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
