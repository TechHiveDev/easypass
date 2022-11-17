import { Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import React from "react";
import { ListItem } from "./ListItem";

export const Request = ({ date, list, cancel }) => {
  const day = date.substring(8, 10);
  const monthNumber = Number(date.substring(5, 7));
  const monthObj = new Date();
  monthObj.setMonth(monthNumber - 1);
  const month = monthObj.toLocaleString().substring(4, 7);
  return (
    <View
      style={{
        marginHorizontal: wp(1),
        marginVertical: hp(1),
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: wp(15),
        }}
      >
        <View
          style={{
            height: "35%",
            display: "flex",
            alignItems: "center",
            maxHeight: hp(8),
          }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: wp(5),
            }}
          >
            {day}
          </Text>
          <Text
            style={{
              color: theme.colors.primary,
            }}
          >
            {month}
          </Text>
        </View>
        <View
          style={{
            height: "10%",
            maxHeight: hp(0.1),
          }}
        />
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              height: "100%",
              width: wp(1),
            }}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
        }}
      >
        {list.map((item) => {
          return <ListItem item={item} key={item.id} cancel={cancel} />;
        })}
      </View>
    </View>
  );
};
