import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { COLORS } from "../../../Colors/colors";
import images from "../../../images";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={images.icSplash} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Buy</Text>
        <Text style={[styles.title, { color: COLORS.primary, marginLeft: 5 }]}>
          Buddy
        </Text>
      </View>
      <Text style={styles.version}>Version 1.0</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  icon: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    color: COLORS.white,
    fontWeight: "bold",
  },
  version: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 5,
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default SplashScreen;
