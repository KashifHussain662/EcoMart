import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import images from "../../../images";
import { COLORS } from "../../../Colors/colors";
import { CustomButton, TextFields } from "../../../sharedComponent";

const GetSTarted = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextFields
        headingText="Ready to start shopping?"
        bodyText={`Sign up now and get a special discount \non your first purchase!`}
      />
      <Image source={images.icGetStarted} style={styles.image} />

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomButton
          label="Sign Up"
          onPress={() => navigation.navigate("CreateAccount")}
          width={"90%"}
          height={45}
        />
        <CustomButton
          label="Get Started"
          onPress={() => navigation.navigate("Login")}
          width={"90%"}
          height={45}
        />
      </View>
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
    marginBottom: 20,
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

export default GetSTarted;
