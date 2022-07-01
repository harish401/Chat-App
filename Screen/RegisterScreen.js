import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Input,
  NativeBaseProvider,
  Icon,
  Center,
  HStack,
  useToast,
  Pressable,
} from "native-base";

import { Button } from "react-native-paper";
import { auth } from "../Screen/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState(null);
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      cancelled: false,
      width: 1080,
      type: "image",
      height: 810,
    });

    //console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registered
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: image
            ? image
            : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
        })
          .then(() => {
            alert("Registered, please login.");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        error.message;
        alert("fill required");
      });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView>
        <NativeBaseProvider>
          {/* <View> */}

          <Animatable.View
            animation="zoomInUp"
            style={{
              padding: 20,
              justifyContent: "center",
              flexDirection: "column",

              flex: 1,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                paddingTop: 0,
              }}
            >
              <Animatable.Text
                animation="flipInY"
                style={{
                  color: "#007bff",
                  fontSize: 23,
                  fontWeight: "bold",
                }}
              >
                Sign-in with account
              </Animatable.Text>
            </View>
            <Input
              placeholder="Enter your name"
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />

            <View style={{ marginTop: 10 }}>
              <Input
                placeholder="Enter your email"
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="email" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Input
                placeholder="Enter your password"
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="visibility" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Input
                placeholder="Enter your image url"
                label="Profile Picture"
                value={avatar}
                onChangeText={(text) => setAvatar(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="link" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
              />
            </View>

            <TouchableOpacity activeOpacity={0.9} onPress={() => addImage()}>
              <View style={{ borderWidth: 0.5, width: "100%", height: 300 }}>
                <Image
                  source={{
                    uri: image ? image : "asset:/dummy.png",
                  }}
                  style={{
                    width: "100%",
                    height: 300,
                    resizeMode: "stretch",
                  }}
                />
              </View>
              <Button
                color="#07b6ff"
                mode="outlined"
                onPress={() => addImage()}
              >
                Choose an image
              </Button>
            </TouchableOpacity>

            <View style={{ marginTop: 5 }}>
              <Button
                onPress={() => {
                  register();
                }}
                color="green"
                mode="contained"
              >
                {" "}
                Register
              </Button>
            </View>
          </Animatable.View>
        </NativeBaseProvider>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 100,
  },
});

export default Register;
