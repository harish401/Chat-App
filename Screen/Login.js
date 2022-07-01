import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../Screen/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "react-native-paper";

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  HStack,
  Center,
  NativeBaseProvider,
  Icon,
} from "native-base";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("Chat");
      })

      .catch((error) => {
        error.message;
        alert("invalid email or password");
      });
    if (email.length == 0) {
      Alert.alert("email", "Email is required");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Login",

      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "white",
        fontSize: 28,
      },
      headerStyle: {
        backgroundColor: "green",
      },
    });
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",

        flex: 1,
      }}
    >
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <NativeBaseProvider>
        <Animatable.View
          animation="slideInDown"
          style={{
            justifyContent: "center",
            flexDirection: "column",

            padding: 15,

            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              paddingBottom: 20,
              alignItems: "flex-start",
            }}
          >
            <Image
              source={{ uri: "shorturl.at/epS69" }}
              style={{ height: 50, width: 50 }}
            ></Image>
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome-
              <Heading
                letterSpacing="2xl"
                size="lg"
                fontWeight="600"
                color="indigo.500"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Chat
              </Heading>
              <Heading
                letterSpacing="2xl"
                size="xl"
                fontWeight="600"
                color="emerald.600"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                L
              </Heading>
              <Heading
                letterSpacing="2xl"
                size="lg"
                fontWeight="600"
                color="indigo.500"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                ogin
              </Heading>
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>
          </View>

          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              type="password"
            />
          </FormControl>
          <View style={{ marginTop: 20 }}>
            <Button mode="contained" color="green" onPress={signin}>
              Sign In
            </Button>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              mode="contained"
              color="green"
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Button>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              mode="contained"
              color="green"
              onPress={() => navigation.navigate("Chat")}
            >
              Already Logged In
            </Button>
          </View>
        </Animatable.View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default Login;
