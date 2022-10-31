import { useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import StyledButton from "../../components/button/Button";
import StyledInput from "../../components/input/Input";
import Header from "../../components/navigation-header/Header";
import themes from "../../themes";

import { ActivityIndicator } from "@react-native-material/core";
import axios from "axios";
import { RESETPASSWORD_URL } from "../../services/global";

export default function ResetPassword() {
  const deviceTheme = useColorScheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await axios.post(RESETPASSWORD_URL, { email: email });
      alert(
        "Solicitado com sucesso, se este email existir por favor verifique sua CAIXA DE ENTRADA/SPAM"
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(
        "Houve um erro na solitação, por favor verifique seus dados e tentae novamente."
      );
      return error;
    }
  };

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
          style={{
            opacity: loading || email.length < 1 ? 0.5 : 1,
          }}
          title={
            loading ? <ActivityIndicator size={20} color="#fff" /> : "RECUPERAR"
          }
          disabled={loading || email.length < 1}
          width="100%"
          onPress={() => handleResetPassword()}
        />
      </View>
    </>
  );
}
