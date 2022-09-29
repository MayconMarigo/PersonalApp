import { View, Text } from "react-native";
import { FooterProps } from "./interface";
export default function Footer(props: FooterProps) {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        backgroundColor: props.backgroundColor,
        paddingVertical: 2,
      }}
    >
      <Text style={{ color: props.color }}>
        Todos os direitos reservados @ 2022 Mobile Trainer
      </Text>
    </View>
  );
}
