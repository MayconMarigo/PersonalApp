import { TextInput, Text, StyleSheet, View } from "react-native";
import { InputProps } from "./interface";

const StyledInput = (props: InputProps) => {
  const styles = StyleSheet.create({
    input: {
      width: props.width || "100%",
      borderBottomWidth: 2,
      borderBottomColor: props.bottom_color,
      marginTop: props.mt,
      marginBottom: props.mb,
    },
  });

  return (
    <TextInput style={styles.input} placeholder={props.placeholder}>
      {props.name}
    </TextInput>
  );
};

export default StyledInput;
