import { Sidebar, MenuItemLink, useTranslate } from "react-admin";
import GroupIcon from "@mui/icons-material/Group";
import entities from "../../entities/entities";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";

// ------------------------------------------------

const icons = {
  group: <GroupIcon />,
  video: <YouTubeIcon />,
  post: <ViewTimelineIcon />,
};
// ------------------------------------------------

export default function MySideMenu(props) {
  const translate = useTranslate();
  return (
    <Sidebar {...props}>
      {entities
        .filter((e) => !e.hide)
        .map((entity, index) => {
          const { name, label } = entity;
          return (
            <MenuItemLink
              key={name + "-" + index}
              to={`/${name}`}
              resource={entity}
              primaryText={translate("menu." + label)}
              leftIcon={icons[name] ? icons[name] : <GroupIcon />}
            />
          );
        })}

      {/*<MenuItemLink*/}
      {/*  key={"asd"}*/}
      {/*  to={`/asd`}*/}
      {/*  primaryText={"custom route"}*/}
      {/*  leftIcon={<GroupIcon />}*/}
      {/*/>*/}
    </Sidebar>
  );
}
