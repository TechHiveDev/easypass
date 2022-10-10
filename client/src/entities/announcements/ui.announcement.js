import show from "./show.announcement";
import create from "./create.announcement";
import edit from "./edit.announcement";
import list from "./list.announcement";

export default {
  name: "announcement",
  label: "Announcement",
  hide: false,
  create,
  edit,
  list,
  show,
};
