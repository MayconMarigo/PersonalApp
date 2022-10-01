import { KeyboardTypeOptions } from "react-native";

export interface InputProps {
  placeholder: string;
  bottom_color?: string;
  width?: string;
  mt?: number;
  mb?: number;
  mv?: number;
  icon?: boolean;
  keyboard?: KeyboardTypeOptions;
  secure?: boolean;
  max?: number;
  value: any;
  onChange: () => void;
}
