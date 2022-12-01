import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "@react-native-material/core";

import LogoLight from "../../images/login-logo-light.png";
import LogoDark from "../../images/login-logo-dark.png";
import StyledInput from "../../components/input/Input";
import StyledButton from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import themes from "../../themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleImg from "../../images/google-logo.png";

//@ts-ignore: Styled Components
import styled from "styled-components/native";
import axios from "axios";
import LoginWithGoogle from "../../services/firebase/Firebase";
import { LOGIN_URL } from "../../services/global";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const deviceTheme = useColorScheme();
  const navigation = useNavigation();

  const StyledText = styled.Text`
    color: ${(props: any) => props.theme.TEXT};
  `;

  useEffect(() => {
    const fetchLoggedUser = async () => {
      if (await AsyncStorage.getItem("@AppPersonal-UID")) {
        return navigation.reset({
          index: 0,
          routes: [{ name: "Home" as never }],
        });
      }
    };
    fetchLoggedUser();
  }, []);

  const HandleLogin = async () => {
    setloading(true);
    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      });
      await AsyncStorage.setItem("@AppPersonal-UID", response?.data?.localId);
      await AsyncStorage.setItem("@AppPersonal-token", response?.data?.idToken);
      await AsyncStorage.setItem(
        "@AppPersonal-personal",
        response?.data?.isPersonal ? "1" : "0"
      );
      setloading(false);
      //@ts-ignore
      navigation.navigate("Home");
    } catch (error) {
      console.warn(error);
      setloading(false);
      Alert.alert("Erro ao efetuar login!", "Usuário ou senha incorretos.");
      return error;
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor:
            //@ts-ignore
            themes[deviceTheme].BACKGROUND || themes.light.BACKGROUND,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ marginBottom: 35 }}
            source={useColorScheme() === "dark" ? LogoDark : LogoLight}
          />
          <View
            style={{
              width: "90%",
              alignItems: "center",
            }}
          >
            <StyledInput
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
              }}
              placeholder="Email"
              mb={10}
              keyboard="email-address"
              autoCapitalize={"none"}
            />
            <StyledInput
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              placeholder="Senha"
              onPress={() => setIsSecure(!isSecure)}
              mb={7}
              icon
              secure={isSecure}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPw" as never)}
              style={{ alignSelf: "flex-end" }}
            >
              <StyledText>Esqueci minha senha</StyledText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              width: "90%",
              alignItems: "center",
            }}
          >
            <StyledButton
              width="100%"
              style={{
                opacity:
                  loading || email.length < 1 || password.length < 1 ? 0.5 : 1,
              }}
              disabled={loading || email.length < 1 || password.length < 1}
              title={
                loading ? (
                  <ActivityIndicator size={20} color="#fff" />
                ) : (
                  "entrar"
                )
              }
              onPress={() => HandleLogin()}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
              <StyledText style={{ marginRight: 5, marginVertical: 20 }}>
                OU
              </StyledText>
              <TouchableOpacity
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                // onPress={async () => await LoginWithGoogle()}
                onPress={() => alert("não implementado ainda")}
              >
                <Image
                  source={GoogleImg}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontWeight: "700", color: "#4388f0" }}>
                  ENTRAR COM A CONTA GOOGLE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cadastrar" as never)}
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  CADASTRAR NOVO EMAIL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Footer />
      </View>
    </>
  );
}
