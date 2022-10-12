import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { InputProps } from "./interface";

import Icon from "react-native-vector-icons/Feather";

const StyledInput = (props: InputProps) => {
  const styles = StyleSheet.create({
    input: {
      width: props.width || "100%",
      flex: 1,
    },
    view: {
      flexDirection: "row",
      marginTop: props.mt,
      marginBottom: props.mb,
      marginVertical: props.mv,
      justifyContent: "space-between",
      backgroundColor: "#fafafa",
      borderRadius: 8,
      padding: 10,
      paddingVertical: props.icon ? 5 : 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <View style={styles.view}>
      <TextInput
        maxLength={props.max || 50}
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.input}
        placeholder={props.placeholder}
        keyboardType={props.keyboard || "default"}
        secureTextEntry={props.secure || false}
      />
      {props.icon ? (
        <TouchableOpacity
          onPress={props.onPress}
          style={{ backgroundColor: "#dadada", borderRadius: 55, padding: 8 }}
        >
          <Icon
            name={props.secure ? "eye-off" : "eye"}
            size={20}
            color="#2E2E2E"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default StyledInput;
