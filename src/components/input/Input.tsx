import {
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { InputProps } from "./interface";

import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";

const StyledInput = (props: InputProps) => {
  const styles = StyleSheet.create({
    input: {
      width: props.width || "100%",
      flex: 1,
    },
    view: {
      flexDirection: "row",
      borderBottomWidth: 1.5,
      borderBottomColor: props.bottom_color || "#2E2E2E",
      marginTop: props.mt,
      marginBottom: props.mb,
      marginVertical: props.mv,
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  const [secure, setIsSecure] = useState<boolean>(true);

  return (
    <View style={styles.view}>
      <TextInput
        maxLength={props.max || 20}
        value={props.value}
        onChange={props.onChange}
        style={styles.input}
        placeholder={props.placeholder}
        keyboardType={props.keyboard || "default"}
        secureTextEntry={secure}
      />
      {props.icon ? (
        <TouchableOpacity onPress={() => setIsSecure(!secure)}>
          <Icon name={secure ? "eye-off" : "eye"} size={20} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default StyledInput;
