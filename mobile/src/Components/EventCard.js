import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Config/style";
import OnGoing from "./OnGoing";
import Attributes from "./Attributes";
import { formatDateTime } from "../Utils/formatDateTime";
import { baseUrl } from "../Config/config";
import { MaterialIcons } from "@expo/vector-icons";

// ==========================================================================

function Tags({ interests, hideIntersets }) {
  if (hideIntersets) return null;

  return (
    <View style={styles.interestsContainer}>
      {[0, 1].map((idx) =>
        interests[idx] ? (
          <Text key={idx} style={styles.intersetCard}>
            {interests[idx]?.slice(0, 10)}
          </Text>
        ) : null
      )}
    </View>
  );
}

// ==========================================================================

export default function EventCard(event) {
  // -----------------------------------------------

  const {
    title: name,
    images = [],
    location_name: location,
    date,
    attributes = [],
    tags,
    hideGoing = true,
    hideIntersets = false,
    hideAttributes = false,
    hideDate = false,
    hideLocation = true,
    width = 65,
    hideIncome = true,
    hidePrice = false,
    user_id,
    promoted,
    is_booked,
    hideBooked = true,
    price,
  } = event;

  // -----------------------------------------------

  const { day, monthName } = formatDateTime(date);

  // -----------------------------------------------

  let imageUrl = "";

  if (images?.length) {
    imageUrl = `${baseUrl}/${images[0]}`;
  }

  // -----------------------------------------------

  return (
    <View style={{ ...styles.container, width: wp(width + "%") }}>
      <View style={styles.header}>
        <Image
          style={styles.circle}
          resizeMode="cover"
          source={
            imageUrl ? { uri: imageUrl } : require("../../assets/icon.png")
          }
        />
        {hideDate ? null : (
          <View style={styles.date}>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.month}>{monthName}</Text>
          </View>
        )}
      </View>

      {/* -------------------------------------------------- */}

      <View style={styles.nameHeader}>
        <Text style={styles.name}>{name?.slice(0, 20)}</Text>
        {promoted ? (
          <MaterialIcons name="recommend" size={18} color={colors?.mainColor} />
        ) : null}
      </View>

      {/* -------------------------------------------------- */}

      <OnGoing
        {...event}
        hideGoing={hideGoing}
        hideIncome={hideIncome}
        hidePrice={hidePrice}
        noNavigate={true}
      />

      {/* -------------------------------------------------- */}

      <View style={styles.tagsPriceContainer}>
        {!hideIntersets ? (
          <View style={styles.tagsContainer}>
            <Tags interests={tags} hideIntersets={hideIntersets} />
          </View>
        ) : null}

        <View style={styles.isBookedPrice}>
          {!hideBooked && is_booked && (
            <MaterialIcons
              name="book"
              style={styles.bookIcon}
              size={15}
              color={colors?.mainColor}
            />
          )}
          {/* ---------------------------------------- */}
          {!hidePrice && (
            <>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.egp}> EGP </Text>
            </>
          )}
        </View>
      </View>

      {/* -------------------------------------------------- */}

      <Attributes {...{ attributes, hideAttributes }} hostId={user_id} />

      {/* -------------------------------------------------- */}

      {!hideLocation && (
        <View style={styles.location}>
          <Ionicons name="location-sharp" style={styles.locationIcn} />
          <Text style={styles.grayDetail}>
            {location?.replace("\n", " ")?.slice(0, 20)?.trim()}
          </Text>
        </View>
      )}
    </View>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    marginVertical: hp("1%"),
    paddingVertical: hp("1.5%"),
    paddingLeft: wp(2),
    paddingRight: wp(1),
    backgroundColor: colors.white,
    marginHorizontal: wp("2%"),
    borderRadius: 10,
    shadowColor: colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.23,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  circle: {
    borderColor: colors.mainColor,
    borderRadius: 200,
    width: wp("20%"),
    height: wp("20%"),
  },
  date: {
    alignItems: "center",
    paddingHorizontal: wp("2%"),
  },
  day: {
    fontSize: RFValue(35, 1024),
    color: colors.mainColor2,
  },
  month: {
    color: colors.mainColor2,
  },
  nameHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
    fontSize: RFValue(25, 1024),
    fontWeight: "bold",
  },
  location: {
    paddingVertical: wp("1%"),
    paddingHorizontal: wp("2%"),
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcn: {
    fontSize: RFValue(21, 1024),
    color: colors.placholderColor,
    marginRight: wp("1%"),
  },
  grayDetail: {
    flex: 1,
    fontSize: RFValue(21, 1024),
    color: colors.placholderColor,
  },
  interestsContainer: {
    flexDirection: "row",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: wp("50%"),
  },
  intersetCard: {
    borderWidth: 1,
    borderRadius: 6,
    fontSize: RFValue(20, 1024),
    marginVertical: hp("0.5%"),
    paddingVertical: hp("0.7%"),
    paddingHorizontal: wp("1.5%"),
    marginLeft: wp("1.5%"),
    color: "rgba(0, 0, 0, 0.8)",
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  tagsPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  isBookedPrice: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    alignItems: "center",
    width: wp(23),
  },
  bookIcon: {
    marginRight: wp(1),
  },
  price: {
    color: colors.mainColor,
    fontWeight: "bold",
    fontSize: RFValue(25, 1024),
  },
  egp: {
    fontSize: RFValue(19, 1024),
    color: colors.mainColor,
  },
});
