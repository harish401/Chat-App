import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Avatar, NativeBaseProvider } from "native-base";
import { auth, db, getAuth } from "../Screen/firebase";
import { signOut } from "firebase/auth";
import * as Animatable from "react-native-animatable";
import {
  GiftedChat,
  Bubble,
  Send,
  Actions,
  onActionPlus,
} from "react-native-gifted-chat";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import DocumentPicker, { types } from "react-native-document-picker";

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <StatusBar backgroundColor="#007bff" barStyle="light-content" />
          <NativeBaseProvider>
            <Avatar
              size="sm"
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </NativeBaseProvider>
        </View>
      ),
      headerTitle: auth?.currentUser?.displayName,
      headerRight: () => (
        <Button
          onPress={() => {
            Alert.alert(
              "Logout",
              "Are you sure? You want to logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    signOutNow();
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          activeOpacity={0.7}
          icon="logout"
          mode="text"
          color="white"
        >
          Logout
        </Button>
      ),
    });
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          ["File"]: async (props) => {
            try {
              const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
              });

              alert("resulting file: " + result);
              alert("string result? " + JSON.stringify(result));
              alert("Filename at best: " + result[0].name);

              let imageRef = storage().ref(`docFiles/${result[0].name}`);
              let filename = result[0].uri;
              const response = await fetch(filename);
              const blob = await response.blob();
              await imageRef.put(blob);
              var dwnload = await imageRef.getDownloadURL();

              console.log("Download file: " + dwnload);

              global.pdfFile = dwnload;
              console.log("pdf file: " + JSON.stringify(global.pdfFile));
            } catch (e) {
              if (DocumentPicker.isCancel(e)) {
                console.log("User cancelled!");
              } else {
                throw e;
              }
            }
          },
          Cancel: (props) => {
            console.log("Cancel");
          },
        }}
        icon={() => (
          <Ionicons
            name={"add"}
            size={28}
            color={"#0077ff"}
            style={{ left: 0, bottom: 0 }}
          />
        )}
        onSend={(args) => console.log(args)}
      />
    );
  };

  const renderBubble = (props) => {
    return (
      <Animatable.View animation="bounceInUp">
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "chocolate",
              borderRightRadius: 60,
            },
            left: {
              backgroundColor: "white",
              borderRightRadius: 60,
            },
          }}
        />
      </Animatable.View>
    );
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Animatable.View
          animation="lightSpeedIn"
          style={{ justifyContent: "center", marginRight: 10, padding: 10 }}
        >
          <Ionicons name="send" size={24} color="chocolate" />
        </Animatable.View>
      </Send>
    );
  };
  const onDelete = (messageIdToDelete) => {
    const newDetailsItem = messages.filter(
      (message) => message.id != messageIdToDelete
    );

    setMessages(newDetailsItem);
  };

  const onLongPress = (context, message, id) => {
    const options = ["Copy", "Delete Message", "Logout", "Cancel"];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
          case 1:
            onDelete(id);
            break;
          case 2:
            signOutNow();
            break;
        }
      }
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user, audio } = messages[0];

    addDoc(collection(db, "chats"), { _id, createdAt, text, user });
  }, []);

  return (
    <GiftedChat
      textInputStyle={{
        color: "orange",
      }}
      renderSend={renderSend}
      renderBubble={renderBubble}
      renderUsernameOnMessage={true}
      onLongPress={onLongPress}
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      scrollToBottomComponent={() => (
        <Ionic name="ios-arrow-round-down" size={30} color="#000" />
      )}
      renderActions={() => renderActions()}
      user={{
        name,
        avatar,
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default Chat;
