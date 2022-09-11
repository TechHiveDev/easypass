import show from "./show.device";
import create from "./create.device";
import edit from "./edit.device";
import list from "./list.device";

export default {
  name: "device",
  label: "Device",
  hide: false,
  create,
  edit,
  list,
  show,
};
