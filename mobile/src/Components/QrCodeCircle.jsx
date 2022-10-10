import React, { useMemo } from "react";
import { Animated, View } from "react-native";

const QrCodeCircle = (props) => {
  const circleStyle = useMemo(
    () => ({
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
    }),
    [props.size]
  );
  return (
    <View
      style={[
        circleStyle,
        {
          flexDirection: "row",
        },
      ]}
    >
      <View
        pointerEvents="box-none"
        style={{
          ...circleStyle,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            ...circleStyle,
            transform: [{ scaleX: 1 }],
          },
          style,
        ]}
      >
        <Animated.View
          style={{
            width: props.size,
            height: props.size,
            transform: [
              {
                rotate: valueToInterpolate.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: ["-180deg", "0deg"],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <View style={this.halfCircleContainerStyle}>
            <View
              style={{
                ...this.fullCircleStyle,
                borderWidth: thickness,
                borderColor: color,
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default QrCodeCircle;
