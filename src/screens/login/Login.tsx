import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Logo from "../../images/login-logo.png";
import StyledInput from "../../components/input/Input";
import StyledButton from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

//@ts-ignore: Styled Components
import styled from "styled-components/native";

export default function Login() {
  const Container = styled.View`
    flex: 1;
    background-color: #d6d6d6;
    justify-content: center;
    align-items: center;
  `;

  interface UserProps {
    email: string;
    password: string;
  }
  const navigation = useNavigation();
  const [user, setUser] = useState<UserProps>({
    email: "",
    password: "",
  });

  return (
    <>
      <Container>
        <View
          style={{
            width: "100%",
            height: "60%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Image source={Logo} />

          <View
            style={{
              width: "80%",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <StyledInput
              value={user.email}
              onChange={(e: string) => setUser({ ...user, email: e })}
              placeholder="Usuário"
              mb={10}
              keyboard="email-address"
            />
            <StyledInput
              value={user.password}
              onChange={(e: string) => setUser({ ...user, password: e })}
              placeholder="Senha"
              mb={7}
              icon
              secure
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPw" as never)}
              style={{ alignSelf: "flex-end" }}
            >
              <Text>Esqueci minha senha</Text>
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
              title="Entrar"
              bgColor="#2E2E2E"
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" as never }],
                })
              }
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ marginRight: 5 }}>Ainda não possui conta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cadastrar" as never)}
              >
                <Text style={{ fontWeight: "900" }}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
      <Footer color="#ffffff" backgroundColor="#2E2E2E" />
    </>
  );
}
