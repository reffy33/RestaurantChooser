import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, Platform } from "react-native";
import PeopleScreen from "../screens/people/PeopleScreen";
import DicisionScreen from "../screens/DecisionScreen";
import RestaurantsScreen from "../screens/restaurants/RestaurantsScreen";

export default function AppNavigation() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Restaurants"
        tabBarPosition={"top"}
        screenOptions={{
          animationEnabled: true,
          swipeEnabled: true,
          lazy: true,
          tabBarShowIcon: true,
          tabBarInactiveTintColor: "#555555",
          tabBarActiveTintColor: "#002aff",
          tabBarStyle: {
            paddingTop: Constants.statusBarHeight,
          },
        }}
      >
        <Tab.Screen
          name="People"
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <Image
                  source={require("../../assets/icon-people.png")}
                  style={{ width: 32, height: 32, tintColor: color }}
                />
              );
            },
          }}
          component={PeopleScreen}
        />
        <Tab.Screen
          name="Decision"
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <Image
                  source={require("../../assets/icon-decision.png")}
                  style={{ width: 32, height: 32, tintColor: color }}
                />
              );
            },
          }}
          component={DicisionScreen}
        />
        <Tab.Screen
          name="Restaurants"
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <Image
                  source={require("../../assets/icon-restaurants.png")}
                  style={{ width: 32, height: 32, tintColor: color }}
                />
              );
            },
          }}
          component={RestaurantsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
