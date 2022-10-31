import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//@ts-ignore
import styled from "styled-components/native";

export default function FindPersonal() {
  const Container = styled.View`
    flex: 1;
    background-color: ${(props: any) => props.theme.TABS_BACKGROUND};
  `;
  const InputContainer = styled.View`
    width: 90%;
    height: 40px;
    padding-horizontal: 10px;
    flex-direction: row;
    border-radius: 8px;
    align-items: center;
    background-color: ${(props: any) => props.theme.INPUT_BACKGROUND};
  `;
  return (
    <Container
      style={{
        paddingHorizontal: 15,
        paddingTop: 15,
      }}
    >
      <View>
        <Text>
          Seja bem vindo,{" "}
          <Text style={{ fontWeight: "700" }}>{`Maycon !`}</Text>
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 10,
          maxHeight: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <InputContainer>
          <Icon name="dumbbell" size={18} />
          <TextInput
            style={{ marginLeft: 15 }}
            placeholder="Busque seus treinos"
          />
        </InputContainer>
        <View
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Icon name="filter-menu" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
