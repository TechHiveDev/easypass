import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Button, Card, Dialog, Paragraph, Portal } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TouchableOpacity from "../../../../Components/TouchableOpacity";

export default function Announcement({
  item: { title = "", description = "", photoUrl },
}) {
  const [visible, setVisible] = useState(false);
  const image = photoUrl ?? "https://picsum.photos/700";
  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(true);
      }}
    >
      <Card style={styles.card}>
        <Card.Cover style={styles.cardCover} source={{ uri: image }} />
        <Card.Title title={title} subtitle={description} />
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{description}</Paragraph>
            <Image
              style={styles.dialogImage}
              resizeMode="contain"
              source={{ uri: image }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    width: wp(65),
    flexDirection: "row",
    borderWidth: 1,
    marginRight: wp(2),
  },
  cardCover: {
    height: hp(12),
  },
  dialogImage: { height: hp(30) },
});
