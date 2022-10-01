import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import Logo from "../../images/login-logo.png";
import StyledInput from "../../components/input/Input";
import StyledButton from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

export default function Login() {
  const styles = StyleSheet.create({
    container_gray: {
      flex: 1,
      backgroundColor: "#D6D6D6",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const navigation = useNavigation();

  return (
    <>
      <View
        style={{ ...styles.container_gray, justifyContent: "space-evenly" }}
      >
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
              value=""
              onChange={() => 0}
              placeholder="Usuário"
              mb={10}
            />
            <StyledInput
              value=""
              onChange={() => 0}
              placeholder="Senha"
              mb={7}
              icon
              secure
            />
            <TouchableOpacity
              onPress={() => alert("z")}
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
              onPress={() => alert("logar")}
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
      </View>
      <Footer color="#ffffff" backgroundColor="#2E2E2E" />
    </>
  );
}
