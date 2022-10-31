import { ColorValue, KeyboardTypeOptions, TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  placeholder: string;
  value: any;
  onChangeText: any;
  onPress?: any;
  onBlur?: () => void;
  bottom_color?: string;
  width?: string;
  mt?: number;
  mb?: number;
  mv?: number;
  icon?: boolean;
  keyboard?: KeyboardTypeOptions;
  errorMessage?: string;
  error?: boolean;
  secure?: boolean;
  max?: number;
  pointerEvents?: "box-none" | "none" | "box-only" | "auto" | undefined;
  bgcolor?: ColorValue;
  color?: ColorValue;
  opacity?: number;
}
