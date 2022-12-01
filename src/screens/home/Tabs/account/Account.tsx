import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";

//@ts-ignore
import styled from "styled-components/native";
import StyledInput from "../../../../components/input/Input";
import axios from "axios";

import {
  ACCOUNT_PERSONAL_URL,
  ACCOUNT_USER_URL,
  RESETPASSWORD_URL,
} from "../../../../services/global";
import { Dialog } from "react-native-simple-dialogs";

export default function Account() {
  const HeaderContainer = styled.View`
    height: 170px;
    background-color: ${(props: any) => props.theme.FOOTER_BACKGROUND};
    justify-content: center;
    padding: 25px;
    position: relative;
  `;

  const [editable, setIsEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [data, setData] = useState<IData | null>();
  const [isPersonal, setIsPersonal] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

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
      let bool = await AsyncStorage.getItem("@AppPersonal-personal");
      setIsPersonal(!!Number(bool));
      try {
        let resp;
        if (!!Number(bool)) {
          resp = await axios.post(ACCOUNT_PERSONAL_URL);
          setData(resp.data);
        } else {
          resp = await axios.post(ACCOUNT_USER_URL);
          setData(resp.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        AsyncStorage.clear();
        return navigation.reset({
          index: 0,
          routes: [{ name: "Login" as never }],
        });
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      "@AppPersonal-personal",
      "@AppPersonal-UID",
      "@AppPersonal-token",
    ]);
    setData(null);
    setIsPersonal(false);
    //@ts-ignore
    return navigation.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    });
  };

  const handlePasswordReset = async () => {
    setButtonLoading(true);
    try {
      await axios.post(RESETPASSWORD_URL, { email: data?.email });
      alert(
        "Solicitado com sucesso, por favor verifique seu email na CAIXA DE ENTRADA/SPAM"
      );

      setButtonLoading(false);
      setPassword("");
      setVisible(false);
    } catch (error) {
      setButtonLoading(false);
      alert(
        "Houve um erro na solitação, por favor verifique seus dados e tentae novamente."
      );
      return error;
    }
  };

  return (
    <>
      <Dialog
        visible={visible}
        title="Redefinição de senha"
        onTouchOutside={() => setVisible(!visible)}
      >
        <View>
          <Text>
            Você pode redefinir a senha para o próximo acesso através do link
            que chegará no email cadastrado.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
            }}
          >
            <Button
              style={{ width: "49%", backgroundColor: "#FFD25A" }}
              color="red"
              loading={buttonLoading}
              title={buttonLoading ? "" : "Solicitar"}
              disabled={buttonLoading}
              onPress={() => handlePasswordReset()}
            />
            <Button
              style={{ width: "49%", backgroundColor: "red" }}
              title="Cancelar"
              onPress={() => {
                setPassword("");
                setVisible(false);
              }}
            />
          </View>
        </View>
      </Dialog>
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
      <ScrollView style={{ flex: 1, padding: 15 }}>
        {loading ? (
          <View style={{ paddingTop: 50 }}>
            <ActivityIndicator size={40} color="#000" />
          </View>
        ) : (
          <>
            {!isPersonal ? null : (
              <>
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
                  value={data?.description}
                  multiline
                  numberOfLines={5}
                  maxLength={150}
                />
              </>
            )}
            <Text style={{ fontWeight: "700", marginBottom: 10 }}>
              Informações da conta
            </Text>
            <Text>Nome</Text>
            <StyledInput
              value={data?.name}
              onChangeText={() => 0}
              placeholder="Nome Completo *"
              mv={3}
              editable={false}
              color="#000"
            />
            <Text style={{ marginTop: 10 }}>Email</Text>
            <StyledInput
              value={data?.email}
              onChangeText={() => 0}
              placeholder="Email"
              mv={3}
              editable={false}
              color="#000"
            />
            {!isPersonal ? null : (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "49%", marginTop: 10 }}>
                    <Text>Hora Aula</Text>
                    <StyledInput
                      value={`R$ ${data?.hours_price}`}
                      // onChangeText={(e: string) => setUser({ ...user, name: e })}
                      onChangeText={() => 0}
                      placeholder="Valor da hora aula"
                      mv={3}
                      editable={editable}
                      pointerEvents={!editable ? "none" : "auto"}
                      bgcolor={!editable ? "#fafafa" : ""}
                      color="#000"
                    />
                  </View>
                  <View style={{ width: "49%", marginTop: 10 }}>
                    <Text>Telefone</Text>
                    <StyledInput
                      value={data?.telephone}
                      // onChangeText={(e: string) => setUser({ ...user, name: e })}
                      onChangeText={() => 0}
                      placeholder="Telefone"
                      mv={3}
                      editable={editable}
                      pointerEvents={!editable ? "none" : "auto"}
                      bgcolor={!editable ? "#fafafa" : ""}
                      color="#000"
                    />
                  </View>
                </View>
                <Text style={{ fontWeight: "700", marginVertical: 10 }}>
                  Especialidades
                </Text>
                {data?.personal_specialty?.map(
                  (speciality: any, index: number) => {
                    return (
                      <StyledInput
                        key={index}
                        value={speciality["specialty"]["name"]}
                        onChangeText={() => 0}
                        placeholder="Telefone"
                        mv={3}
                        editable={editable}
                        color="#000"
                      />
                    );
                  }
                )}
              </>
            )}
          </>
        )}
        <View
          style={{
            bottom: 0,
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Button
            title="Solicitar redefinição de senha"
            onPress={() => setVisible(true)}
            style={{
              width: "100%",
              backgroundColor: "red",
              marginBottom: 5,
              marginTop: 50,
            }}
          />
          <Button
            title="sair"
            onPress={() => handleLogout()}
            color="red"
            style={{
              marginBottom: 50,
              width: "100%",
              backgroundColor: "#FFE15A",
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
