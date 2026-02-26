import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import PropTypes from "prop-types";

export default function CustomButton({
  text,
  onPress,
  buttonStyle,
  textStyle,
  width,
  disabled,
}: {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  width?: number;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[
        buttonStyle,
        styles.button,
        { width, backgroundColor: disabled ? "#ccc" : "#007bff" },
      ]}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 10, borderRadius: 8, alignItems: "center" },
  text: { color: "#fff", fontWeight: "bold" },
});
