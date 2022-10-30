import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Button, Card, Dialog, Portal, Text } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import globalStyles from "../../Theme/global.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../Theme/paper.theme";
import { View } from "moti";
import { FlashList } from "@shopify/flash-list";
import { fakeData } from "./fakeData";
import { useState } from "react";
import TouchableOpacity from "../../Components/TouchableOpacity";
import { useNavigation } from "@react-navigation/native";

function Discover({ name, icon, ...rest }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("FacilityItem", {
      name,
      title: name,
      icon,
      ...rest,
    });
    // setVisible(true);
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Card style={styles.card}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: hp(15),
          }}
        >
          <MaterialCommunityIcons
            name={icon}
            size={80}
            color={theme.colors.grey}
          />
        </View>
        <View
          style={{
            width: wp(30),
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </View>
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{name}</Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: hp(15),
              }}
            >
              <MaterialCommunityIcons
                name={icon}
                size={80}
                color={theme.colors.grey}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: hp(2),
            }}
          >
            <Button
              onPress={() => {
                setVisible(false);
                Alert.alert(
                  "Request sent and technician will contact you soon"
                );
              }}
              mode={"contained"}
            >
              Request Service
            </Button>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
}

// =================================================================

export default function FacilityScreen() {
  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: theme.colors.transparentGrey,
        },
      ]}
    >
      <FlashList
        data={fakeData}
        renderItem={({ item }) => <Discover {...item} />}
        keyExtractor={(item) => item.name}
        estimatedItemSize={50}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: hp(1),
    marginHorizontal: wp(1.5),
    width: hp(22),
    height: hp(22),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: wp(0.1),
    textAlign: "center",
  },
  image: {
    height: hp(20),
  },
  row: {
    ...globalStyles.rowView,
    marginVertical: hp(1),
  },
  col: {
    width: wp(45),
    height: hp(25),
  },
});
