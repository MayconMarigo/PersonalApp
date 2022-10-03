import { StyleSheet, Button, View, TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "./interface";

export default function StyledButton(props: ButtonProps) {
  const styles = StyleSheet.create({
    button: {
      width: props.width,
      backgroundColor: props.bgColor,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: props.mt,
      marginBottom: props.mb,
      marginVertical: props.mv,
    },
  });
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text
        style={{
          color: props.color || "#D6D6D6",
          fontWeight: "600",
          fontSize: 14,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
