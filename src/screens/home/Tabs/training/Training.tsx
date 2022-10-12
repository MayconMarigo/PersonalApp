import { Divider } from "@react-native-material/core";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TrainingCard from "../../../../components/trainingCard/TrainingCard";

//@ts-ignore
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Training() {
  const Container = styled.View`
    flex: 1;
    background-color: ${(props: any) => props.theme.TABS_BACKGROUND};
  `;
  const InputContainer = styled.View`
    width: 90%;
    height: 40px;
    padding-horizontal: 10px;
    flex-direction: row;
    border-radius: 8px;
    align-items: center;
    background-color: ${(props: any) => props.theme.INPUT_BACKGROUND};
  `;

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      //@ts-ignore
      const user = await JSON.parse(AsyncStorage.getItem("@AppPersonal-user"));
    };
    fetchData();
  }, []);

  return (
    <Container
      style={{
        paddingHorizontal: 15,
        paddingTop: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          maxHeight: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <InputContainer>
          <Icon name="dumbbell" size={18} />
          <TextInput
            style={{ marginLeft: 15 }}
            placeholder="Busque seus treinos"
          />
        </InputContainer>
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
    </Container>
  );
}
