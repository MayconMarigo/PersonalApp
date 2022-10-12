import React from "react";
import { useColorScheme, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckboxProps } from "./interface";
//@ts-ignore
import styled from "styled-components/native";

export default function CheckBox(props: CheckboxProps) {
  const StyledCheckBox = styled.TouchableOpacity`
    width: 25px;
    height: 25px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    border-color: ${(props: any) => props.theme.FOOTER_BACKGROUND};
  `;

  const StyledText = styled.Text`
    color: ${(props: any) => props.theme.TEXT};
    margin-left: 6px;
  `;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <StyledCheckBox
        onPress={props.onChange}
        style={{
          backgroundColor: "#fff",
        }}
      >
        {props.value ? (
          <Icon
            name="check"
            style={{
              fontSize: 16,
              color: useColorScheme() === "dark" ? "#FFE15A" : "#2E2E2E",
            }}
          />
        ) : null}
      </StyledCheckBox>
      <StyledText>{props.label}</StyledText>
    </View>
  );
}
