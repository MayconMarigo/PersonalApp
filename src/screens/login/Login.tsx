import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import Logo from "../../images/login-logo.png";
import StyledInput from "../../components/input/Input";
import StyledButton from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

export default function Login() {
  return (
    <>
      <View style={styles.container_white} />
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
              name=""
              placeholder="Usuário"
              bottom_color="black"
              mb={10}
            />
            <StyledInput
              name=""
              placeholder="Senha"
              bottom_color="black"
              mb={7}
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
              color="#2E2E2E"
              onPress={() => alert("botaozin")}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ marginRight: 5 }}>Ainda não possui conta?</Text>
              <TouchableOpacity>
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

const styles = StyleSheet.create({
  container_white: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container_gray: {
    flex: 9,
    backgroundColor: "#D6D6D6",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
