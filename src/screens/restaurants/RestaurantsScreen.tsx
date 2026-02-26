import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./ListScreen";
import AddScreen from "./AddScreen";

export default function RestaurantsScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="RestaurantsList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RestaurantsList" component={ListScreen} />
      <Stack.Screen name="RestaurantsAdd" component={AddScreen} />
    </Stack.Navigator>
  );
}
