import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput } from "react-native";
import { useEffect, useState } from "react";

//@ts-ignore
import styled from "styled-components/native";
import StyledInput from "../../../../components/input/Input";
import axios from "axios";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { ACCOUNT_PERSONAL_URL } from "../../../../services/global";

export default function Account() {
  const HeaderContainer = styled.View`
    height: 170px;
    background-color: ${(props: any) => props.theme.FOOTER_BACKGROUND};
    justify-content: center;
    padding: 25px;
    position: relative;
  `;

  const [about, setAbout] = useState<string>("");
  const [editable, setIsEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData>();
  const navigation = useNavigation();

  interface IData {
    city_id: number;
    cpf: string;
    description: string;
    email: string;
    hours_price: number;
    id: number;
    is_active: boolean;
    is_admin: boolean;
    name: string;
    personal_feedback: [];
    personal_gym: [];
    personal_specialty: Array<{ speciality: { name: string } }>;
    telephone: string;
    uid: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let person = await axios.post(ACCOUNT_PERSONAL_URL, {
          uid: await AsyncStorage.getItem("@AppPersonal-UID"),
        });
        setData(person?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return navigation.reset({
          index: 0,
          routes: [{ name: "Login" as never }],
        });
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    //@ts-ignore
    navigation.navigate("Login");
  };

  return (
    <>
      <HeaderContainer>
        <View
          style={{
            backgroundColor: "red",
            width: 100,
            height: 100,
            borderRadius: 999,
          }}
        />
        <Text
          style={{
            position: "absolute",
            fontWeight: "700",
            color: "#fff",
            alignSelf: "flex-end",
            bottom: 0,
            padding: 15,
            textTransform: "capitalize",
          }}
        >
          {data?.name}
        </Text>
      </HeaderContainer>
      <View style={{ flex: 1, padding: 15 }}>
        <Text style={{ fontWeight: "700" }}>Sobre mim</Text>
        <TextInput
          style={{
            padding: 15,
            borderRadius: 8,
            backgroundColor: "#FFD25A",
            marginVertical: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          placeholder="Adicionar algo sobre mim..."
          onChangeText={(e) => setAbout(e)}
          value={data?.description}
          multiline
          numberOfLines={5}
          maxLength={150}
        />
        <Text style={{ fontWeight: "700", marginBottom: 10 }}>
          Informações da conta
        </Text>
        <StyledInput
          value={data?.name.toUpperCase()}
          // onChangeText={(e: string) => setUser({ ...user, name: e })}
          onChangeText={() => 0}
          placeholder="Nome Completo *"
          mv={3}
          editable={editable}
          pointerEvents={!editable ? "none" : "auto"}
          bgcolor={!editable ? "#fafafa" : ""}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "49%" }}>
            <StyledInput
              value={`R$ ${data?.hours_price}`}
              // onChangeText={(e: string) => setUser({ ...user, name: e })}
              onChangeText={() => 0}
              placeholder="Valor da hora aula"
              mv={3}
              editable={editable}
              pointerEvents={!editable ? "none" : "auto"}
              bgcolor={!editable ? "#fafafa" : ""}
            />
          </View>
          <View style={{ width: "49%" }}>
            <StyledInput
              value={data?.telephone}
              // onChangeText={(e: string) => setUser({ ...user, name: e })}
              onChangeText={() => 0}
              placeholder="Telefone"
              mv={3}
              editable={editable}
              pointerEvents={!editable ? "none" : "auto"}
              bgcolor={!editable ? "#fafafa" : ""}
            />
          </View>
        </View>
        <Text style={{ fontWeight: "700", marginVertical: 10 }}>
          Especialidades
        </Text>
        {data?.personal_specialty?.map((speciality: any, index: number) => {
          return (
            <StyledInput
              key={index}
              value={speciality["specialty"]["name"]}
              // onChangeText={(e: string) => setUser({ ...user, name: e })}
              onChangeText={() => 0}
              placeholder="Telefone"
              mv={3}
              editable={editable}
              pointerEvents={!editable ? "none" : "auto"}
              bgcolor={!editable ? "#fafafa" : ""}
            />
          );
        })}
        <Button
          title="sair"
          onPress={() => handleLogout()}
          style={{ marginTop: 10 }}
        />
      </View>
    </>
  );
}
