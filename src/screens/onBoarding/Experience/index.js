import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import images from "../../../images";
import { COLORS } from "../../../Colors/colors";
import { CustomButton, TextFields } from "../../../sharedComponent";

const Experience = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextFields
        headingText="Personalized Experience"
        bodyText=" Get recommendations based on your preferences. Create your wishlist
        and never miss a deal"
      />
      <Image source={images.icExperience} style={styles.image} />
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
      <CustomButton
        label="Next"
        onPress={() => navigation.navigate("Convence")}
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
    width: 300,
    resizeMode: "contain",
    borderRadius: 20,
    marginVertical: 20,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // marginBottom: 20,
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

export default Experience;
