import Icon from "@expo/vector-icons/AntDesign";
import { Chip, Stack } from "@react-native-material/core";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import StyledButton from "../../components/button/Button";
import CheckBox from "../../components/checkbox/Checkbox";
import Footer from "../../components/footer/Footer";
import StyledInput from "../../components/input/Input";
import Header from "../../components/navigation-header/Header";
import { UserProps } from "./interface";
import themes from "../../themes";

//@ts-ignore: Styled Components
import styled from "styled-components/native";

export default function Register() {
  const HeaderContainer = styled.View`
    justify-content: space-evenly;
    align-items: center;
    height: 200px;
    background-color: ${(props: any) =>
      props.theme.NAVIGATION_HEADER_BACKGROUND};
  `;

  const deviceTheme = useColorScheme();

  const styles = StyleSheet.create({
    photo_container: {
      width: 150,
      height: 150,
      borderRadius: 99,
      borderColor: "#ffffff",
      borderWidth: 5,
      marginBottom: "-15%",
      backgroundColor: "#FFD25A",
    },
  });
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [isSecureRepeatPassword, setIsSecureRepeatPassword] =
    useState<boolean>(true);
  const [client, setClient] = useState<boolean>(true);
  const [personal, setPersonal] = useState<boolean>(false);
  const [chips, setChips] = useState<Array<string>>([]);
  const [text, setText] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
    password: "",
    isPersonal: false,
    roles: [...chips],
    hourValue: 0,
    about: "",
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  var chipsArr: Array<string> = [];
  const onChangeText = (text: any) => {
    setText(text);
    if (text.slice(-1) == ";") {
      chipsArr = [...chips];
      chipsArr.push(text.split(";")[0]);
      text = "";
      setChips(chipsArr);
      setText("");
    }
  };

  let removeArr: Array<string> = [];
  const handleRemove = (name: string) => {
    removeArr = chips.filter((e) => {
      return e != name;
    });

    setChips(removeArr);
  };

  const onCheckboxChange = (name: string) => {
    if (name == "client") {
      setClient(true);
      setPersonal(false);
      return;
    } else {
      setClient(false);
      setPersonal(true);
    }
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor:
            //@ts-ignore
            themes[deviceTheme].BACKGROUND || themes.light.BACKGROUND,
        }}
      >
        <HeaderContainer>
          <Header iconName="arrow-back" title="Cadastro" />
          <View style={styles.photo_container} />
        </HeaderContainer>
        <View
          style={{
            backgroundColor:
              //@ts-ignore
              themes[deviceTheme].BACKGROUND || themes.light.BACKGROUND,
            paddingHorizontal: 20,
            justifyContent: "center",
            paddingTop: 50,
            zIndex: -1,
          }}
        >
          <StyledInput
            value={user.name}
            onChangeText={(e: string) => setUser({ ...user, name: e })}
            placeholder="Nome Completo *"
            mv={6}
          />
          <StyledInput
            value={user.email}
            onChangeText={(e: string) => setUser({ ...user, email: e })}
            placeholder="Email *"
            mv={6}
            keyboard="email-address"
          />
          <StyledInput
            value={user.password}
            onChangeText={(e: string) => setUser({ ...user, password: e })}
            placeholder="Senha *"
            icon
            mv={6}
            onPress={() => setIsSecure(!isSecure)}
            secure={isSecure}
          />
          <StyledInput
            value={repeatPassword}
            onChangeText={(e: string) => setRepeatPassword(e)}
            placeholder="Confirme a senha *"
            icon
            mv={6}
            onPress={() => setIsSecureRepeatPassword(!isSecureRepeatPassword)}
            secure={isSecureRepeatPassword}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <CheckBox
              label="Sou Cliente"
              value={client}
              onChange={() => onCheckboxChange("client")}
            />
            <CheckBox
              label="Sou Personal Trainer"
              value={personal}
              onChange={() => onCheckboxChange("personal")}
            />
          </View>
          {personal && (
            <View>
              {chips.length > 0 && <Text>Especialidades</Text>}
              <View>
                <Stack
                  style={{
                    alignItems: "flex-start",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {chips?.map((chip: string, index: number) => (
                    <Chip
                      style={{
                        marginHorizontal: 2,
                        marginVertical: 5,
                        backgroundColor: "#FFD25A",
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
                      onPress={() => handleRemove(chip)}
                      key={index}
                      label={chip}
                      trailing={() => <Icon name="closecircleo" size={16} />}
                    />
                  ))}
                </Stack>
                <TextInput
                  value={text}
                  style={{
                    marginTop: chips.length > 0 ? 5 : 0,
                    padding: 15,
                    borderRadius: 8,
                    backgroundColor: "#FFD25A",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  placeholder="Especialidades separadas por ; *"
                  onChangeText={(e) => onChangeText(e)}
                  autoCapitalize="words"
                  maxLength={150}
                />
              </View>
              <StyledInput
                value={user.hourValue}
                onChangeText={(e: number) => setUser({ ...user, hourValue: e })}
                placeholder="Valor da hora aula *"
                mv={10}
              />
              <TextInput
                style={{
                  padding: 15,
                  borderRadius: 8,
                  backgroundColor: "#FFD25A",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                placeholder="Fale um pouco sobre você...*"
                onChangeText={(e) => setAbout(e)}
                value={about}
                multiline
                numberOfLines={4}
                autoCapitalize="words"
                maxLength={150}
              />
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 15,
              marginBottom: 25,
            }}
          >
            <StyledButton title="LIMPAR CAMPOS" onPress={() => 0} width="45%" />
            <StyledButton
              title="CADASTRAR"
              onPress={() => console.warn(user.email, user.name, user.password)}
              width="45%"
            />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}
