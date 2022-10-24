import * as Linking from "expo-linking";

const callPhone = (phone) => Linking.openURL(`tel:${phone}`);

export default callPhone;
