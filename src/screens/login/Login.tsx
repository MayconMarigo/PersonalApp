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
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "@react-native-material/core";

import LogoLight from "../../images/login-logo-light.png";
import StyledInput from "../../components/input/Input";
import StyledButton from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import themes from "../../themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

//@ts-ignore: Styled Components
import styled from "styled-components/native";
import axios from "axios";

export default function Login() {
  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await JSON.parse(
          //@ts-ignore
          AsyncStorage.getItem("@AppPersonal-user")
        );

        console.warn(user);
        if (user)
          return navigation.reset({
            index: 0,
            routes: [{ name: "Home" as never }],
          });
      } catch (error) {
        return;
      }
    };
    fetchUser();
  }, []);

  const StyledText = styled.Text`
    color: ${(props: any) => props.theme.TEXT};
  `;
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const HandleLogin = async () => {
    setloading(true);
    try {
      const response = await axios.post("http://18.207.247.235/login", {
        email: email,
        password: password,
      });
      const jsonValue = JSON.stringify(response.data);
      await AsyncStorage.setItem("@AppPersonal-user", jsonValue);
      console.warn(response);

      setloading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" as never }],
      });
    } catch (error) {
      setloading(false);
      Alert.alert("Erro ao efetuar login!", "Usuário ou senha incorretos.");
      return error;
    }
  };

  const [loading, setloading] = useState(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);

  const deviceTheme = useColorScheme();

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
            width: "100%",
            height: "60%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Image source={useColorScheme() === "dark" ? "" : LogoLight} />
          <View
            style={{
              width: "80%",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <StyledInput
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
              }}
              placeholder="Usuário"
              mb={10}
              keyboard="email-address"
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
              width: "80%",
              alignItems: "center",
            }}
          >
            <StyledButton
              width="100%"
              style={{ opacity: loading ? 0.5 : 1 }}
              disabled={loading}
              title={
                loading ? (
                  <ActivityIndicator size={20} color="#fff" />
                ) : (
                  "entrar"
                )
              }
              onPress={() => HandleLogin()}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <StyledText style={{ marginRight: 5 }}>
                Ainda não possui conta?
              </StyledText>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cadastrar" as never)}
              >
                <StyledText style={{ fontWeight: "900" }}>
                  Cadastre-se
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
}
