import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import images from "../../../images";
import { COLORS } from "../../../Colors/colors";
import { CustomButton, TextFields } from "../../../sharedComponent";

const Highlights = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextFields
        headingText="Feature Highlights"
        bodyText="Discover millions of products at the best prices. Fast delivery and
        secure payments."
      />
      <Image source={images.ichighlights} style={styles.image} />
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <CustomButton
        label="Next"
        onPress={() => navigation.navigate("Experience")}
        width={"90%"}
        height={45}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: 16,
  },
  image: {
    height: 300,
    width: 350,
    resizeMode: "contain",
    marginVertical: 20,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.light,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
});

export default Highlights;
