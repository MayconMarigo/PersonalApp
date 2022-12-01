import { ActivityIndicator, Divider } from "@react-native-material/core";
import { useEffect, useState } from "react";
import IconAnt from "@expo/vector-icons/AntDesign";

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TrainingCard from "../../../../components/trainingCard/TrainingCard";

import AsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import styled from "styled-components/native";
import axios from "axios";
import { TRAINING_BY_USER } from "../../../../services/global";
import { useNavigation } from "@react-navigation/native";

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
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [trainingArray, setTrainingArray] = useState<any[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await AsyncStorage.getItem("@AppPersonal-UID");
        const res = await axios.post(TRAINING_BY_USER, { uid: uid });

        setTrainingArray(res.data);
      } catch (error) {
        // console.warn(error);
        return error;
      } finally {
        setLoading(false);
      }
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
      <Modal animationType="slide" visible={modal} transparent>
        <View
          style={{
            height: "50%",
            marginTop: "auto",
            backgroundColor: "#000000",
            opacity: 0.6,
          }}
        />
        <View
          style={{
            height: "50%",
            marginTop: "auto",
            padding: 10,
            backgroundColor: "#ffff",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => setModal(false)}
          >
            <IconAnt name="closecircleo" size={30} />
          </TouchableOpacity>
          <View>
            <Text>Filtros em construção</Text>
          </View>
        </View>
      </Modal>
      <View>
        <Text>Seja bem vindo ! </Text>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 10,
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
          <TouchableOpacity onPress={() => setModal(true)}>
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
      {loading ? (
        <ActivityIndicator style={{ marginTop: 55 }} size={40} color="#000" />
      ) : trainingArray && trainingArray.length > 0 ? (
        <ScrollView style={{ marginTop: 25 }}>
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
      ) : (
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
              onPress={() => navigation.navigate("Personal" as never)}
            >
              <Text
                style={{ fontWeight: "900", textDecorationLine: "underline" }}
              >
                procurar por profissionais aqui !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Container>
  );
}
