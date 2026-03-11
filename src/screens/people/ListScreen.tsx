import { useEffect, useState } from "react";
import { Alert, View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/CustomButton";
import { Person } from "../../types/person";

export default function ListScreen({ navigation }: any) {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const data = await AsyncStorage.getItem("people");
      if (data) setPeople(JSON.parse(data));
    };

    fetchPeople();
  }, []);

  const deletePerson = async (id: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          const updated = people.filter((r) => r.key !== id);
          await AsyncStorage.setItem("people", JSON.stringify(updated));
          setPeople(updated);
          Toast.show({
            type: "error",
            position: "bottom",
            visibilityTime: 2000,
            text1: "Person deleted",
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomButton
        text="Add person"
        onPress={() => navigation.navigate("PeopleAdd")}
      />

      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>
              {item.firstName}
              {item.lastName ? ` ${item.lastName}` : ""}
            </Text>
            <CustomButton
              text="Delete"
              onPress={() => deletePerson(item.key)}
              buttonStyle={styles.deleteButton}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  text: { fontSize: 18 },
  deleteButton: { backgroundColor: "red" },
});
