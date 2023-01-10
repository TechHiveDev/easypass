import {
  MenuItemLink,
  Sidebar,
  useLocaleState,
  useSidebarState,
  useTranslate,
} from "react-admin";
import { useQuery } from "react-query";
import GroupIcon from "@mui/icons-material/Group";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import Button from "@mui/material/Button";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { onMessageListener } from "../../utils/firebase/firebase";
import entities from "../../entities/entities";
import customFetch from "../../utils/customFetch";

// ------------------------------------------------

const icons = {
  group: <GroupIcon />,
  video: <YouTubeIcon />,
  post: <ViewTimelineIcon />,
};
// ------------------------------------------------

const NotificationProvider = () => {
  const { addToast } = useToasts();
  onMessageListener()
    .then(({ notification, data }: any) => {
      addToast(
        <>
          <h3>{notification.title}</h3>
          <Link to={`/request/${data.requestId}/show`}>See it</Link>
        </>,
        {
          appearance: "info",
        }
      );
    })
    .catch((err) => console.log("failed: ", err));
  return null;
};

// =======================================================================

export default function MySideMenu(props: any) {
  const translate = useTranslate();
  const [checked, setChecked] = useState(true);
  const [open] = useSidebarState();
  const [locale] = useLocaleState();
  const { data } = useQuery(["notifications"], () =>
    customFetch("/request", {})
  );
  const notificationCount = data?.filter(
    (d: any) => d?.adminSeen === false
  ).length;

  return (
    <Sidebar {...props}>
      <NotificationProvider />
      {entities
        .filter((e) => !e.hide)
        .map((entity: any, index: number) => {
          const { name, label } = entity;
          if (
            name === "request" &&
            notificationCount &&
            notificationCount !== 0
          ) {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MenuItemLink
                  key={`${name}-${index}`}
                  to={`/${name}`}
                  resource={entity}
                  primaryText={translate(`menu.${label}`)}
                  // @ts-ignore
                  leftIcon={icons[name] ? icons[name] : <GroupIcon />}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "20px",
                    minWidth: "20px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "25px",
                      width: "25px",
                      backgroundColor: "#2196f3",
                      borderRadius: "50%",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {notificationCount}
                  </span>
                </div>
              </div>
            );
          }
          return (
            <MenuItemLink
              key={`${name}-${index}`}
              to={`/${name}`}
              resource={entity}
              primaryText={translate(`menu.${label}`)}
              // @ts-ignore
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
        &nbsp; {translate("reports")}
      </Button>
      <Collapse in={open && checked}>
        <div
          style={{
            //@ts-ignore
            marginLeft: locale === "en" ? "20px" : null,
            //@ts-ignore
            marginRight: locale === "ar" ? "20px" : null,
          }}
        >
          <MenuItemLink
            to="/reports/scan"
            primaryText={translate("menu.Scan")}
            leftIcon={<GroupIcon />}
          />
          <MenuItemLink
            to="/reports/invite"
            primaryText={translate("menu.Invitation")}
            leftIcon={<GroupIcon />}
          />
        </div>
      </Collapse>
    </Sidebar>
  );
}
