import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // setAnimating(false);
      navigation.replace("Intro");
      // @react-native-firebase/storage
    }, 1500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ padding: 20 }}>
        <Ionicons
          size={100}
          color="green"
          resizeMode="stretch"
          name="chatbox"
        />
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={{
          borderWidth: 2,
          borderColor: "black",
          padding: 10,
          paddingBottom: 0,
          paddingTop: 0,
          marginTop: 20,
          backgroundColor: "white",
        }}
      >
        <Animatable.Text
          easing="ease-out"
          iterationCount="infinite"
          animation="lightSpeedIn"
          duration={1750}
          style={{
            color: "green",
            fontSize: 40,

            padding: 10,
            paddingBottom: 0,
            paddingTop: 0,

            fontWeight: "bold",
          }}
        >
          C
          <Text
            style={{
              color: "black",
              fontSize: 40,

              padding: 10,
              paddingBottom: 0,
              paddingTop: 0,

              fontWeight: "bold",
            }}
          >
            H
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 40,

              padding: 10,
              paddingBottom: 0,
              paddingTop: 0,

              fontWeight: "bold",
            }}
          >
            A
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 40,

              padding: 10,
              paddingBottom: 0,
              paddingTop: 0,

              fontWeight: "bold",
            }}
          >
            T
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 40,

              padding: 10,
              paddingBottom: 0,
              paddingTop: 0,

              fontWeight: "bold",
            }}
          >
            S
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 40,

              padding: 10,
              paddingBottom: 0,
              paddingTop: 0,

              fontWeight: "bold",
            }}
          >
            Z
          </Text>
        </Animatable.Text>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
