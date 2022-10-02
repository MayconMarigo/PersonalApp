import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Stack, Chip } from "@react-native-material/core";
import StyledButton from "../../components/button/Button";
import CheckBox from "../../components/checkbox/Checkbox";
import Footer from "../../components/footer/Footer";
import StyledInput from "../../components/input/Input";
import Icon from "@expo/vector-icons/AntDesign";
import Back from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const styles = StyleSheet.create({
    container_gray: {
      backgroundColor: "#2E2E2E",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: 200,
    },
    container_white: {
      backgroundColor: "#F2F2F2",
      paddingHorizontal: 20,
      justifyContent: "center",
      paddingTop: 50,
      zIndex: -1,
    },
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

  const navigation = useNavigation();
  const [client, setClient] = useState<boolean>(true);
  const [personal, setPersonal] = useState<boolean>(false);
  const [chips, setChips] = useState<Array<string>>([]);
  const [text, setText] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isPersonal: false,
    roles: [...chips],
    hourValue: 0,
    about: "",
  });

  var chipsArr: Array<string> = [];
  const onChangeText = (text: string) => {
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
      <ScrollView>
        <View style={styles.container_gray}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity>
              <Back
                name="arrow-back"
                style={{ color: "white", fontSize: 24 }}
                onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 24, marginLeft: 20 }}>
              Cadastro
            </Text>
          </View>
          <View style={styles.photo_container} />
        </View>
        <View style={styles.container_white}>
          <StyledInput
            value=""
            onChange={() => 0}
            placeholder="Nome Completo *"
            mv={10}
          />
          <StyledInput
            value=""
            onChange={() => 0}
            placeholder="Email *"
            mv={10}
          />
          <StyledInput
            value=""
            onChange={() => 0}
            placeholder="Senha *"
            icon
            mv={10}
          />
          <StyledInput
            value=""
            onChange={() => 0}
            placeholder="Confirme a senha *"
            icon
            mv={10}
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
              iconColor="#2E2E2E"
              checkColor="#2E2E2E"
              value={client}
              onChange={() => onCheckboxChange("client")}
            />
            <CheckBox
              label="Sou Personal Trainer"
              iconColor="#2E2E2E"
              checkColor="#2E2E2E"
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
                      }}
                      onPress={() => handleRemove(chip)}
                      key={index}
                      label={chip}
                      trailing={() => <Icon name="closecircleo" size={16} />}
                    />
                  ))}
                </Stack>
                <TextInput
                  style={{
                    marginTop: chips.length > 0 ? 5 : 0,
                    padding: 15,
                    borderRadius: 8,
                    backgroundColor: "#FFD25A",
                  }}
                  placeholder="Especialidades separadas por ; *"
                  onChangeText={(e) => onChangeText(e)}
                  value={text}
                  autoCapitalize="words"
                  maxLength={150}
                />
              </View>
              <StyledInput
                value=""
                onChange={() => 0}
                placeholder="Valor da hora aula *"
                mv={10}
              />
              <TextInput
                style={{
                  padding: 15,
                  borderRadius: 8,
                  backgroundColor: "#FFD25A",
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
            <StyledButton
              title="LIMPAR CAMPOS"
              onPress={() => 0}
              width="45%"
              bgColor="#2E2E2E"
              color="#ffffff"
            />
            <StyledButton
              title="CADASTRAR"
              onPress={() => 0}
              width="45%"
              bgColor="#FFD25A"
              color="#2E2E2E"
            />
          </View>
        </View>
      </ScrollView>
      <Footer backgroundColor="#2E2E2E" color="#FFFFFF" />
    </>
  );
}
