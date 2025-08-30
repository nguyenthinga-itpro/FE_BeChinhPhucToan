import React from "react";
import { Animated, Dimensions, View, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");
const SCROLL_BAR_HEIGHT = height * 0.1;
const ScrollBar = ({ scrollY }) => {
  const scrollIndicator = scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [0, height],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.scrollBarContainer}>
      <View style={styles.scrollBar}>
        <Animated.View
          style={[
            styles.scrollThumb,
            {
              height: SCROLL_BAR_HEIGHT,
              transform: [{ translateY: scrollIndicator }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollBarContainer: {
    position: "absolute",
    top: "25%",
    right: 5,
    justifyContent: "center",
  },
  scrollBar: {
    width: 3,
    backgroundColor: "#666",
    borderRadius: 5,
    paddingBottom: 350,
    alignItems: "center",
  },
  scrollThumb: {
    width: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#666",
  },
});

export default ScrollBar;
