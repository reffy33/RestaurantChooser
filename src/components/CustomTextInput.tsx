import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";

export default function CustomTextInput(
  props: {
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    textInputStyle?: StyleProp<TextStyle>;
    error?: string;
  } & TextInputProps,
) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      <TextInput
        style={[
          styles.input,
          props.textInputStyle,
          props.error ? { borderColor: "red", borderWidth: 1 } : {},
        ]}
        {...props}
      />
      {!!props.error && (
        <Text style={{ color: "red", marginLeft: 10, fontSize: 12 }}>
          {props.error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { fontSize: 16, fontWeight: "bold" },
  input: { borderWidth: 1, padding: 8, borderRadius: 5 },
});
