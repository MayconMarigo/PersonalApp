import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from "@react-native-material/core";
import TrainingCard from "../../../../components/training/Training";

export default function Training() {
  const styles = StyleSheet.create({
    container_gray: {
      flex: 1,
      backgroundColor: "#F2F2F2",
      paddingHorizontal: 15,
      paddingTop: 15,
    },
  });

  const [search, setSearch] = useState<string>("");

  return (
    <View style={styles.container_gray}>
      <View
        style={{
          width: "100%",
          maxHeight: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            height: 40,
            paddingHorizontal: 10,
            flexDirection: "row",
            borderRadius: 8,
            alignItems: "center",
            backgroundColor: "#B6B6B6",
          }}
        >
          <Icon name="dumbbell" size={18} />
          <TextInput
            style={{ marginLeft: 15 }}
            placeholder="Busque seus treinos"
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Icon name="filter-menu" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: "100%", marginTop: 25 }}>
        <View
          style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{ fontWeight: "900", paddingRight: 10, color: "#2E2E2E" }}
          >
            MEUS TREINOS
          </Text>
          <Divider
            style={{ width: "100%", height: 2, backgroundColor: "#2E2E2E" }}
          />
        </View>
      </View>

      <View style={{ width: "100%", marginVertical: 24 }}>
        <Text style={{ textAlign: "center" }}>
          Ops ! Parece que você ainda não possui treinos registrados :(
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Você pode </Text>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: "900", textDecorationLine: "underline" }}
            >
              procurar por profissionais aqui !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <TrainingCard
          personal={"Maycon Marigo"}
          training="Aeróbico"
          value={"4.2"}
        />
        <TrainingCard
          personal={"Maycon Marigo"}
          training="Aeróbico"
          value={"4.2"}
        />
        <TrainingCard
          personal={"Maycon Marigo"}
          training="Aeróbico"
          value={"4.2"}
        />
        <TrainingCard
          personal={"Maycon Marigo"}
          training="Aeróbico"
          value={"4.2"}
        />
      </ScrollView>
    </View>
  );
}
