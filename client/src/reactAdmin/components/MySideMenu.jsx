import {
  Sidebar,
  MenuItemLink,
  useTranslate,
  useSidebarState,
} from "react-admin";
import GroupIcon from "@mui/icons-material/Group";
import entities from "../../entities/entities";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AssessmentIcon from "@mui/icons-material/Assessment";
// ------------------------------------------------

const icons = {
  group: <GroupIcon />,
  video: <YouTubeIcon />,
  post: <ViewTimelineIcon />,
};
// ------------------------------------------------

export default function MySideMenu(props) {
  const translate = useTranslate();
  const [checked, setChecked] = useState(false);
  const [open] = useSidebarState();
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
      <Button
        sx={{
          textTransform: "none",
          width: "100%",
          justifyContent: "flex-start",
          color: "gray",
          fontSize: "1rem",
          paddingLeft: "1.2rem",
          zIndex: "1",
        }}
        onClick={() => setChecked((p) => !p)}
        startIcon={<AssessmentIcon />}
      >
        &nbsp; Reports
      </Button>
      <Collapse in={open && checked}>
        <div
          style={{
            marginLeft: "20px",
          }}
        >
          <MenuItemLink
            to={`/reports/scan`}
            primaryText={"Scan"}
            leftIcon={<GroupIcon />}
          />{" "}
          <MenuItemLink
            to={`/reports/invite`}
            primaryText={"Invite"}
            leftIcon={<GroupIcon />}
          />
        </div>
      </Collapse>
    </Sidebar>
  );
}
