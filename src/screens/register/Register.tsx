import Icon from "@expo/vector-icons/AntDesign";
import { ActivityIndicator, Chip, Stack } from "@react-native-material/core";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import StyledButton from "../../components/button/Button";
import CheckBox from "../../components/checkbox/Checkbox";
import StyledInput from "../../components/input/Input";
import Header from "../../components/navigation-header/Header";

import themes from "../../themes";
import { UserProps } from "./interface";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
//@ts-ignore: Styled Components
import styled from "styled-components/native";
import {
  REGISTER_PERSONAL_URL,
  REGISTER_USER_URL,
} from "../../services/global";
import { CPFValidator } from "../../services/validators/cpfcnpj-services";

export default function Register() {
  const HeaderContainer = styled.View`
    justify-content: space-evenly;
    align-items: center;
    height: 200px;
    background-color: ${(props: any) =>
      props.theme.NAVIGATION_HEADER_BACKGROUND};
  `;

  const deviceTheme = useColorScheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

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
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [isSecureRepeatPassword, setIsSecureRepeatPassword] =
    useState<boolean>(true);
  const [client, setClient] = useState<boolean>(true);
  const [personal, setPersonal] = useState<boolean>(false);
  const [chips, setChips] = useState<Array<string>>([]);
  const [gymChips, setGymChips] = useState<Array<string>>([]);
  const [text, setText] = useState<string>("");
  const [gym, setGym] = useState<string>("");
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    CPF: "",
    hourValue: "",
    about: "",
    phone: "",
    city: "",
    isPersonal: false,
  });

  interface IErrors {
    name: boolean;
    email: boolean;
    password: boolean;
    repeatPassword: boolean;
    CPF: boolean;
    hourValue: boolean;
    roles: boolean;
    academies: boolean;
    gyms: boolean;
    phone: boolean;
    city: boolean;
    about: boolean;
  }
  const [errors, setErrors] = useState<IErrors>({
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
    CPF: false,
    hourValue: false,
    roles: false,
    academies: false,
    gyms: false,
    phone: false,
    city: false,
    about: false,
  });

  var chipsArr: Array<string> = [];
  const addChips = (text: any) => {
    if (text === "") return alert("Favor preencher sua especialidade.");
    chipsArr = [...chips];
    chipsArr.push(text);
    text = "";
    setChips(chipsArr);
    setText("");
  };

  let removeArr: Array<string> = [];
  const handleRemove = (name: string) => {
    removeArr = chips.filter((e) => {
      return e != name;
    });

    setChips(removeArr);
  };

  let removeGymArr: Array<string> = [];
  const handleRemoveGym = (name: string) => {
    removeGymArr = gymChips.filter((e) => {
      return e != name;
    });

    setGymChips(removeGymArr);
  };

  var gymChipsArr: Array<string> = [];

  const addGymChips = (text: any) => {
    if (text === "") return alert("Favor inserir uma academia.");
    gymChipsArr = [...gymChips];
    gymChipsArr.push(text);
    text = "";
    setGymChips(gymChipsArr);
    setGym("");
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

  const handleRegister = async () => {
    setIsSubmit(true);
    setLoading(true);
    await checkInputErrors();
    if (
      Object.values(errors).includes(true) ||
      !isSubmit
      // || Object.values(user).includes("")
    ) {
      setLoading(false);
      return null;
    }
    try {
      if (personal) {
        await axios.post(REGISTER_PERSONAL_URL, {
          fullName: user.name,
          email: user.email,
          password: user.password,
          cpf: user.CPF,
          hourPrice: Number(user.hourValue.replace(",", ".").split(" ")[1]),
          description: user.about,
          telephone: user.phone,
          cityName: user.city,
          specializations: chips,
        });
      } else {
        await axios.post(REGISTER_USER_URL, {
          fullName: user.name,
          email: user.email,
          password: user.password,
        });
      }
      setLoading(false);
      Alert.alert("Cadastro realizado", "Registro realizado com sucesso!");
      navigation.navigate("Login" as never);
    } catch (error: any) {
      setLoading(false);
      console.warn(error);
      Alert.alert(
        "Erro!",
        "Ocorreu um erro ao realizar o registro, por favor tente novamente."
      );
    }
  };

  const checkInputErrors = async () => {
    let errorObj: IErrors = {
      name: false,
      email: false,
      password: false,
      repeatPassword: false,
      CPF: false,
      hourValue: false,
      roles: false,
      academies: false,
      gyms: false,
      phone: false,
      city: false,
      about: false,
    };
    //name
    if (user.name.length === 0) errorObj.name = true;
    if (user.name.split(" ").length < 2) errorObj.name = true;
    // if (
    //   user.name.split(" ")[0].length < 3 ||
    //   user.name.split(" ")[1].length < 3
    // )
    //   errorObj.name = true;

    //email
    if (!user.email.includes("@") || !user.email.includes("."))
      errorObj.email = true;
    if (user.email.includes(".") && user.email.includes("@")) {
      if (!user.email.split("@")[1].includes(".")) errorObj.email = true;
      if (user.email.split("@")[1].split(".")[1].length < 2)
        errorObj.email = true;
    }

    //password
    errorObj.password = user.password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/
    )
      ? false
      : true;

    //repeatpassword
    if (user.repeatPassword.length == 0) errorObj.repeatPassword = true;
    if (user.password != user.repeatPassword && user.password.length > 0)
      errorObj.repeatPassword = true;

    setErrors(errorObj);

    if (personal) {
      //cnpj
      // if (!CNPJValidator(user.CPF)) errorObj.CPF = true;

      //cpf
      if (!CPFValidator(user.CPF)) errorObj.CPF = true;

      //hourvalue
      if (user.hourValue.length == 0) errorObj.hourValue = true;

      //phone
      if (user.phone.length < 15) errorObj.phone = true;

      //city
      if (user.city == "") errorObj.city = true;

      //roles
      if (chips.length == 0) errorObj.roles = true;

      //gyms
      if (gymChips.length < 1) errorObj.gyms = true;

      //about
      if (user.about.length == 0) errorObj.about = true;

      setErrors(errorObj);
    }
  };

  const CleanFields = () => {
    const userObj: UserProps = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      CPF: "",
      hourValue: "",
      about: "",
      phone: "",
      city: "",
      isPersonal: personal,
    };
    const errorObj: IErrors = {
      name: false,
      email: false,
      password: false,
      repeatPassword: false,
      CPF: false,
      hourValue: false,
      roles: false,
      academies: false,
      gyms: false,
      phone: false,
      city: false,
      about: false,
    };
    setIsSubmit(false);
    setUser(userObj);
    setErrors(errorObj);
    setGymChips([]);
    setChips([]);
  };

  return (
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
          onBlur={() => {
            if (!isSubmit) return;
            checkInputErrors();
          }}
          onChangeText={(e: string) => setUser({ ...user, name: e })}
          error={errors.name}
          errorMessage={errors.name ? "Nome inválido ou vazio" : ""}
          placeholder="Nome Completo *"
          mv={6}
          autoCapitalize="words"
        />
        <StyledInput
          value={user.email}
          onBlur={() => {
            if (!isSubmit) return;
            checkInputErrors();
          }}
          onChangeText={(e: string) => setUser({ ...user, email: e })}
          error={errors.email}
          errorMessage={errors.email ? "Email inválido ou vazio" : ""}
          placeholder="Email *"
          mv={6}
          keyboard="email-address"
          autoCapitalize="none"
        />
        <StyledInput
          value={user.password}
          onBlur={() => {
            if (!isSubmit) return;
            checkInputErrors();
          }}
          onChangeText={(e: string) => setUser({ ...user, password: e })}
          error={errors.password}
          errorMessage={
            errors.password
              ? "A senha precisa ter:\n" +
                "- Mínimo de 8 e no máximo 14 caracteres\n" +
                "- Um número\n" +
                "- Uma Letra minúscula\n" +
                "- Uma Letra maiúscula\n" +
                "- Um caractere especial ( @#$%& )"
              : ""
          }
          placeholder="Senha *"
          icon
          mv={6}
          onPress={() => setIsSecure(!isSecure)}
          secure={isSecure}
        />
        <StyledInput
          value={user.repeatPassword}
          onBlur={() => {
            if (!isSubmit) return;
            checkInputErrors();
          }}
          onChangeText={(e: string) => setUser({ ...user, repeatPassword: e })}
          error={errors.repeatPassword}
          errorMessage={
            errors.repeatPassword ? "As senhas não são iguais." : ""
          }
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
        {!!personal && (
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "49%" }}>
                <MaskInput
                  placeholder="CPF *"
                  maxLength={14}
                  keyboardType="number-pad"
                  value={user.CPF}
                  onBlur={() => checkInputErrors()}
                  onChangeText={(e) => setUser({ ...user, CPF: e })}
                  style={{
                    borderWidth: errors.CPF ? 1 : 0,
                    borderColor: errors.CPF ? "red" : "",
                    marginBottom: 10,
                    backgroundColor: "#fafafa",
                    padding: 10,
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
                  mask={Masks.BRL_CPF}
                />
                {!!errors.CPF && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginTop: -8,
                      marginBottom: 3,
                      marginLeft: 5,
                    }}
                  >
                    CPF inválido ou vazio
                  </Text>
                )}
              </View>
              <View style={{ width: "49%" }}>
                <MaskInput
                  value={user.hourValue}
                  onBlur={() => checkInputErrors()}
                  mask={Masks.BRL_CURRENCY}
                  onChangeText={(e: string) =>
                    setUser({
                      ...user,
                      hourValue: e,
                    })
                  }
                  placeholder="Valor da hora aula *"
                  keyboardType="number-pad"
                  style={{
                    borderWidth: errors.hourValue ? 1 : 0,
                    borderColor: errors.hourValue ? "red" : "",
                    marginBottom: 10,
                    backgroundColor: "#fafafa",
                    padding: 10,
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
                />
                {!!errors.hourValue && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginTop: -8,
                      marginBottom: 3,
                      marginLeft: 5,
                    }}
                  >
                    Valor inválido ou vazio
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "49%" }}>
                <MaskInput
                  placeholder="Telefone *"
                  maxLength={15}
                  keyboardType="number-pad"
                  value={user.phone}
                  onBlur={() => checkInputErrors()}
                  onChangeText={(e) => setUser({ ...user, phone: e })}
                  style={{
                    borderWidth: errors.phone ? 1 : 0,
                    borderColor: errors.phone ? "red" : "",
                    marginBottom: 10,
                    backgroundColor: "#fafafa",
                    padding: 10,
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
                  mask={Masks.BRL_PHONE}
                />
                {!!errors.phone && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginTop: -8,
                      marginBottom: 3,
                      marginLeft: 5,
                    }}
                  >
                    Telefone inválido ou incompleto
                  </Text>
                )}
              </View>
              <View style={{ width: "49%" }}>
                <MaskInput
                  placeholder="Cidade *"
                  maxLength={40}
                  value={user.city}
                  onBlur={() => checkInputErrors()}
                  onChangeText={(e) => setUser({ ...user, city: e })}
                  style={{
                    borderWidth: errors.city ? 1 : 0,
                    borderColor: errors.city ? "red" : "",
                    marginBottom: 10,
                    backgroundColor: "#fafafa",
                    padding: 10,
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
                />
                {!!errors.city && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginTop: -8,
                      marginBottom: 3,
                      marginLeft: 5,
                    }}
                  >
                    Cidade inválida ou vazia
                  </Text>
                )}
              </View>
            </View>
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
                    trailing={() => (
                      <Icon
                        name="closecircleo"
                        style={{ backgroundColor: "#fff", borderRadius: 99 }}
                        size={16}
                      />
                    )}
                  />
                ))}
              </Stack>
              <View
                style={{
                  marginTop: chips.length > 0 ? 5 : 0,
                  marginBottom: 10,
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
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: errors.roles ? 1 : 0,
                  borderColor: errors.roles ? "red" : "",
                }}
              >
                <TextInput
                  value={text}
                  onBlur={() => checkInputErrors()}
                  placeholder="Especialidades *"
                  onChangeText={(e) => setText(e)}
                  autoCapitalize="words"
                  maxLength={150}
                />
                <TouchableOpacity onPress={() => addChips(text)}>
                  <Icon
                    name="pluscircleo"
                    size={28}
                    style={{ backgroundColor: "#fff", borderRadius: 99 }}
                  />
                </TouchableOpacity>
              </View>
              {!!errors.roles && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: -8,
                    marginLeft: 5,
                    marginBottom: 4,
                  }}
                >
                  Especialidades incorretas ou vazia
                </Text>
              )}
            </View>
            {gymChips.length > 0 && <Text>Academias</Text>}
            <View>
              <Stack
                style={{
                  alignItems: "flex-start",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {gymChips?.map((chip: string, index: number) => (
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
                    onPress={() => handleRemoveGym(chip)}
                    key={index}
                    label={chip}
                    trailing={() => (
                      <Icon
                        name="closecircleo"
                        style={{ backgroundColor: "#fff", borderRadius: 99 }}
                        size={16}
                      />
                    )}
                  />
                ))}
              </Stack>
              <View
                style={{
                  marginTop: gymChips.length > 0 ? 5 : 0,
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
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: errors.gyms ? 1 : 0,
                  borderColor: errors.gyms ? "red" : "",
                }}
              >
                <TextInput
                  value={gym}
                  onBlur={() => checkInputErrors()}
                  placeholder="Academias *"
                  onChangeText={(e) => setGym(e)}
                  autoCapitalize="words"
                  maxLength={150}
                />
                <TouchableOpacity onPress={() => addGymChips(gym)}>
                  <Icon
                    name="pluscircleo"
                    size={28}
                    style={{ backgroundColor: "#fff", borderRadius: 99 }}
                  />
                </TouchableOpacity>
              </View>
              {!!errors.gyms && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  Academias incorretas ou vazia
                </Text>
              )}
            </View>
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
                marginTop: 10,
                borderWidth: errors.about ? 1 : 0,
                borderColor: errors.about ? "red" : "",
              }}
              placeholder="Fale um pouco sobre você...*"
              onChangeText={(e) => setUser({ ...user, about: e })}
              onBlur={() => checkInputErrors()}
              value={user.about}
              multiline
              numberOfLines={4}
              autoCapitalize="words"
              maxLength={150}
            />
            {!!errors.about && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  marginTop: 5,
                  marginLeft: 5,
                }}
              >
                Campo obrigatório
              </Text>
            )}
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
          <StyledButton
            title="LIMPAR CAMPOS"
            onPress={() => CleanFields()}
            width="45%"
          />
          <StyledButton
            style={{ opacity: loading ? 0.5 : 1 }}
            disabled={loading}
            title={
              loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                "Cadastrar"
              )
            }
            onPress={() => handleRegister()}
            width="45%"
          />
        </View>
      </View>
    </ScrollView>
  );
}
