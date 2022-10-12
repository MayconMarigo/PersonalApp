import { ButtonProps } from "./interface";
//@ts-ignore
import styled from "styled-components/native";

export default function StyledButton(props: ButtonProps) {
  const StyledTouchableButton = styled.TouchableOpacity`
    width: ${props.width};
    background-color: ${(props: any) => props.theme.BUTTON_BACKGROUND};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding-vertical: 10px;
    shadow-color: #000;

    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
  `;

  const StyledText = styled.Text`
    color: ${(props: any) => props.theme.BUTTON_TEXT};
    font-weight: 900;
    text-transform: uppercase;
  `;

  return (
    <StyledTouchableButton
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        marginTop: props.mt,
        marginBottom: props.mb,
        marginVertical: props.mv,
        ...props.style,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }}
    >
      <StyledText>{props.title}</StyledText>
    </StyledTouchableButton>
  );
}
