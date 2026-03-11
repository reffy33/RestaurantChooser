import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import ListScreen from "./ListScreen";
import AddScreen from "./AddScreen";

export default function PeopleScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="PeopleList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PeopleList" component={ListScreen} />
      <Stack.Screen name="PeopleAdd" component={AddScreen} />
    </Stack.Navigator>
  );
}
