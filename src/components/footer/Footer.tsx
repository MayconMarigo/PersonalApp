//@ts-ignore
import styled from "styled-components/native";
import PackageJson from "../../../package.json";
export default function Footer() {
  const Container = styled.View`
    width: 100%;
    align-items: center;
    background-color: ${(props: any) => props.theme.FOOTER_BACKGROUND};
    padding-vertical: 8px;
  `;

  const StyledText = styled.Text`
    color: ${(props: any) => props.theme.FOOTER_TEXT};
    font-size: 12px;
  `;

  return (
    <Container>
      <StyledText>
        Todos os direitos reservados @ 2022 Mobile Trainer {PackageJson.version}
      </StyledText>
    </Container>
  );
}
