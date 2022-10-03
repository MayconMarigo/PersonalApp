import { StyleSheet, Text, View } from "react-native";
import StyledButton from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import StyledInput from "../../components/input/Input";
import Header from "../../components/navigation-header/Header";
import { useState } from "react";

export default function ResetPassword() {
  const styles = StyleSheet.create({
    container_main: {
      flex: 1,
      backgroundColor: "#D6D6D6",
      paddingHorizontal: 25,
      paddingTop: 30,
      alignItems: "center",
    },
  });

  const [email, setEmail] = useState("");

  return (
    <>
      <View
        style={{
          width: "100%",
          paddingVertical: 18,
          backgroundColor: "#2E2E2E",
        }}
      >
        <Header iconName="arrow-back" title="Esqueci minha senha" />
      </View>
      <View style={styles.container_main}>
        <StyledInput
          value={email}
          mb={15}
          placeholder="E-mail *"
          onChange={(e) => setEmail(e)}
          keyboard="email-address"
        />
        <Text>Por favor verifique sua caixa de email e spam</Text>
        <StyledButton
          mt={20}
          title="RECUPERAR"
          bgColor="#2E2E2E"
          width="100%"
        />
      </View>
      <Footer backgroundColor="#2E2E2E" color="#fff" />
    </>
  );
}
