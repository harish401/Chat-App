import React, { useState, useRef } from "react";
import { WebView } from "react-native-webview";
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";

export default function TermAndCondition({ navigation }) {
  const [visible, setVisible] = useState(false);
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const ref = useRef(null);
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <WebView
        ref={ref}
        source={{ uri: "https://www.google.com" }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
        allowsBackForwardNavigationGestures
      />

      {visible && (
        <ActivityIndicator
          color="red"
          size="large"
          style={{
            position: "absolute",
            top: height / 2,
            left: width / 2.1,
          }}
        />
      )}
    </>
  );
}
