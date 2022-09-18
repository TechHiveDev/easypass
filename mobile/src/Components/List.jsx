import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { List as PaperList, Divider, Avatar } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
//============================================================================

const RenderItem = ({
  item,
  index,
  separators,
  icon = null,
  itemTitleField,
  itemDescriptionField,
  onPress = null,
}) => (
  <TouchableOpacity enabled={false} onPress={onPress}>
    <PaperList.Item
      selectable={true}
      title={item[itemTitleField] || "asd"}
      description={item[itemDescriptionField] || ""}
      left={(props) =>
        icon ? (
          <Avatar.Text
            style={styles.icon}
            size={25}
            label={item?.name[0].toUpperCase()}
          />
        ) : null
      }
    />
    <Divider />
  </TouchableOpacity>
);

//============================================================================

export default function List({
  data,
  key = "id",
  icon = null,
  itemTitleField = "title",
  itemDescriptionField = "description",

  // itemPress props :   item, index, separators
  itemPress = (props) => null,
}) {
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={(props) => (
        <RenderItem
          onPress={() => itemPress(props)}
          {...{ itemTitleField, itemDescriptionField, icon, ...props }}
        />
      )}
      keyExtractor={(item) => item[key]}
    />
  );
}

//============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(90),
  },
  icon: {
    alignSelf: "center",
  },
});
