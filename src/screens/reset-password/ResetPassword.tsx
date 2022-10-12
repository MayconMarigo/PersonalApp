import { useState } from "react";
import { Alert, Text, useColorScheme, View } from "react-native";
import StyledButton from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import StyledInput from "../../components/input/Input";
import Header from "../../components/navigation-header/Header";
import themes from "../../themes";

export default function ResetPassword() {
  const deviceTheme = useColorScheme();
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <Header iconName="arrow-back" title="Esqueci minha senha" />
      <View
        style={{
          backgroundColor:
            //@ts-ignore
            themes[deviceTheme].BACKGROUND || themes.light.BACKGROUND,
          flex: 1,
          paddingHorizontal: 25,
          paddingTop: 30,
          alignItems: "center",
        }}
      >
        <StyledInput
          mb={15}
          placeholder="E-mail *"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          keyboard="email-address"
        />
        <Text>Por favor verifique sua caixa de email e spam</Text>
        <StyledButton
          mt={20}
          title="RECUPERAR"
          width="100%"
          onPress={() => Alert.alert("Erro!", "Não implementado ainda!")}
        />
      </View>
      <Footer />
    </>
  );
}
