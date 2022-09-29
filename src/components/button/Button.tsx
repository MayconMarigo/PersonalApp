import { StyleSheet, Button, View } from "react-native";
import { ButtonProps } from "./interface";
export default function StyledButton(props: ButtonProps) {
  return (
    <View style={{ width: props.width }}>
      <Button color={props.color} title={props.title} onPress={props.onPress} />
    </View>
  );
}
