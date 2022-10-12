import { KeyboardTypeOptions, TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  placeholder: string;
  value: any;
  onChangeText: any;
  onPress?: any;
  bottom_color?: string;
  width?: string;
  mt?: number;
  mb?: number;
  mv?: number;
  icon?: boolean;
  keyboard?: KeyboardTypeOptions;
  secure?: boolean;
  max?: number;
}
