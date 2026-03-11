import { ScrollView, View, Text, StyleSheet, Platform } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Person } from "../../types/person";
import { validateFirstName, validateName } from "./validators";

type PeopleState = Person & {
  errors: {
    firstName?: string;
    lastName?: string;
    relationship?: string;
  };
};

export default function AddScreen({ navigation }: any) {
  const [person, setPerson] = useState<PeopleState>({
    firstName: "",
    lastName: "",
    relationship: "other",
    key: `r_${new Date().getTime()}`,
    errors: {},
  });

  const setField = (field: keyof typeof person, value: string) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const isFieldsHasError = () => {
    const { firstName, lastName, relationship } = person;
    const errors = {
      firstName: validateFirstName(firstName),
      lastName: lastName ? validateName(lastName) : null,
      relationship: !relationship ? "Relationship is required" : null,
    } as PeopleState["errors"];

    setPerson((prev) => ({ ...prev, errors }));
    return Object.values(errors).some((error) => error !== null);
  };

  const savePerson = async () => {
    const check = isFieldsHasError();
    if (check) {
      const firstErrorField = Object.keys(person.errors).find(
        (key) => person.errors[key as keyof typeof person.errors],
      );

      if (firstErrorField) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Validation Error",
          text2: person.errors[firstErrorField as keyof typeof person.errors],
          visibilityTime: 3000,
        });
      }
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("people");
      const people = existingData ? JSON.parse(existingData) : [];
      people.push(person);
      await AsyncStorage.setItem("people", JSON.stringify(people));

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Person saved successfully",
        visibilityTime: 2000,
      });
      navigation.navigate("PeopleList");
    } catch (error) {
      console.error("Failed to save person:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error saving person",
        text2: "Please try again",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.addScreenInnerContainer}>
        <View style={styles.addScreenFormContainer}>
          <CustomTextInput
            label="First name"
            maxLength={50}
            value={person.firstName}
            onChangeText={(text) => setField("firstName", text)}
            error={person.errors.firstName}
          />

          <CustomTextInput
            label="Last name"
            maxLength={50}
            value={person.lastName}
            onChangeText={(text) => setField("lastName", text)}
            error={person.errors.lastName}
          />

          <Text style={styles.fieldLabel}>Relationship</Text>
          <View style={[styles.pickerContainer]}>
            <Picker
              prompt="Relationship"
              selectedValue={person.relationship}
              onValueChange={(value) => setField("relationship", value)}
              style={[
                styles.picker,
                person.errors.relationship ? { borderColor: "red" } : {},
              ]}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Me" value="me" />
              <Picker.Item label="Family" value="family" />
              <Picker.Item label="Friend" value="friend" />
              <Picker.Item label="Colleague" value="colleague" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          {person.errors.relationship && (
            <Text style={{ color: "red", marginLeft: 10, marginBottom: 10 }}>
              {person.errors.relationship}
            </Text>
          )}
        </View>

        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancelButton}
          />
          <CustomButton
            text="Save"
            onPress={savePerson}
            buttonStyle={styles.saveButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addScreenInnerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
    paddingBottom: 20,
  },
  addScreenFormContainer: { width: "96%" },
  fieldLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  pickerContainer: {
    ...Platform.select({
      ios: {},
      android: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
      android: {},
    }),
  },
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },
  cancelButton: { backgroundColor: "gray", width: "44%" },
  saveButton: { backgroundColor: "green", width: "44%" },
});
