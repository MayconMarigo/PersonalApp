import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { CheckboxProps } from "./interface";

export default function CheckBox(props: CheckboxProps) {
  const styles = StyleSheet.create({
    CheckBox: {
      width: 25,
      height: 25,
      borderWidth: 1,
      borderRadius: 9999,
      justifyContent: "center",
      alignItems: "center",
    },
    WrapperCheckBox: {
      flexDirection: "row",
      alignItems: "center",
    },
    LabelCheck: {
      color: props.color || "#2E2E2E",
      marginLeft: 6,
    },
  });
  return (
    <View style={styles.WrapperCheckBox}>
      <TouchableOpacity
        onPress={props.onChange}
        style={[
          styles.CheckBox,
          { borderColor: props.checkColor ? props.checkColor : "#fff" },
        ]}
      >
        {props.value ? (
          <Icon
            name="check"
            style={{
              fontSize: 16,
              color: props.iconColor ? props.iconColor : "#fff",
            }}
          />
        ) : null}
      </TouchableOpacity>

      <Text style={styles.LabelCheck}>{props.label}</Text>
    </View>
  );
}
