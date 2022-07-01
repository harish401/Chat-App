import React, { useState } from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Screen/Login";

import ChatScreen from "./Screen/ChatScreen";
import Intro from "./Screen/Intro";
import Web from "./Screen/Web";

import SplashScreen from "./Screen/Splashscreen";
import RegisterScreen from "./Screen/RegisterScreen";

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: "Chat Signup",
            headerTitleStyle: {
              color: "white",
            },
            headerStyle: {
              backgroundColor: "green",
            },
          }}
        />

        <Stack.Screen name="Web" component={Web} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerTitle: "Messenger",
            headerTitleStyle: {
              color: "white",
            },

            headerStyle: {
              backgroundColor: "#007bff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
