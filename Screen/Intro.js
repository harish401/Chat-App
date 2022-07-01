import React, { useState } from "react";
import { WebView } from "react-native-webview";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const IntroScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <View style={styles.header}>
        <Ionicons
          size={150}
          color="white"
          resizeMode="stretch"
          name="md-chatbubble-ellipses"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig"
        delay={100}
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          One To One Chat with yours!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#07b6ff", fontSize: 19 }}>
            SignUp with New account
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("Web")}>
            <View colors={["#FFA07A", "#FF6347"]} style={styles.signIn}>
              <LinearGradient
                colors={["green", "#50C878"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Browser Page</Text>
                <MaterialIcons name="navigate-next" color="white" size={25} />
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <Text style={{ color: "black", fontSize: 19 }}>Already a User?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#07b6ff", fontSize: 19 }}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default IntroScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
});
