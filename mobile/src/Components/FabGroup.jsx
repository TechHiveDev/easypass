import { useState } from "react";
import { FAB } from "react-native-paper";
import i18 from "i18n-js";

// =======================================================

export default function FabGroup({
  icon1 = "pen",
  icon2 = "plus",
  actions = [{ icon: "plus" }, { icon: "star" }],
}) {
  const [open, setOpen] = useState(false);

  let newActions = actions?.map((action) => ({
    ...action,
    label: action.label ? i18.t(action.label) : i18.t("welcome"),
    icon: action.icon || "plus",
    small: false,
    onPress: action?.onPress ? action.onPress : null,
  }));

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  return (
    <FAB.Group
      open={open}
      icon={open ? icon2 : icon1}
      actions={newActions}
      onStateChange={() => setOpen(!open)}
      onPress={() => {
        // if (open) {
        // do something if the speed dial is open
        // }
      }}
    />
  );
}
