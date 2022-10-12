import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { HeaderProps } from "./interface";
import { useNavigation } from "@react-navigation/native";
//@ts-ignore
import styled from "styled-components/native";

export default function Header(props: HeaderProps) {
  const Container = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding-horizontal: 15px;
    padding-vertical: 18px;
    background-color: ${(props: any) =>
      props.theme.NAVIGATION_HEADER_BACKGROUND};
  `;

  const StyledText = styled.Text`
    color: ${(props: any) => props.theme.NAVIGATION_HEADER_TEXT};
    font-size: 18px;
    flex: 1;
    text-align: right;
  `;

  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity>
        <Icon
          name={props.iconName}
          style={{
            color: useColorScheme() === "dark" ? "#2E2E2E" : "#fff",
            fontSize: 24,
            padding: 5,
          }}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <StyledText>{props.title}</StyledText>
    </Container>
  );
}
