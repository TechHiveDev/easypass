import {
  MenuItemLink,
  Sidebar,
  useLocaleState,
  useSidebarState,
  useTranslate,
} from 'react-admin';
import GroupIcon from '@mui/icons-material/Group';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { onMessageListener } from '../../utils/firebase';
import entities from '../../entities/entities';
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
    .then(({ notification, data }) => {
      addToast(
        <>
          <h3>{notification.title}</h3>
          <Link to={`/request/${data.requestId}/show`}>See it</Link>
        </>,
        {
          appearance: 'info',
        }
      );
    })
    .catch((err) => console.log('failed: ', err));
  return null;
};
export default function MySideMenu(props) {
  const translate = useTranslate();
  const [checked, setChecked] = useState(true);
  const [open] = useSidebarState();
  const [locale] = useLocaleState();
  return (
    <Sidebar {...props}>
      <NotificationProvider />
      {entities
        .filter((e) => !e.hide)
        .map((entity, index) => {
          const { name, label } = entity;
          return (
            <MenuItemLink
              key={`${name}-${index}`}
              to={`/${name}`}
              resource={entity}
              primaryText={translate(`menu.${label}`)}
              leftIcon={icons[name] ? icons[name] : <GroupIcon />}
            />
          );
        })}
      <Button
        sx={{
          textTransform: 'none',
          width: '100%',
          justifyContent: 'flex-start',
          color: 'gray',
          fontSize: '1rem',
          paddingLeft: '1.2rem',
          zIndex: '1',
        }}
        onClick={() => setChecked((p) => !p)}
        startIcon={<AssessmentIcon />}
      >
        &nbsp; {translate('reports')}
      </Button>
      <Collapse in={open && checked}>
        <div
          style={{
            marginLeft: locale === 'en' ? '20px' : null,
            marginRight: locale === 'ar' ? '20px' : null,
          }}
        >
          <MenuItemLink
            to="/reports/scan"
            primaryText={translate('menu.Scan')}
            leftIcon={<GroupIcon />}
          />{' '}
          <MenuItemLink
            to="/reports/invite"
            primaryText={translate('menu.Invitation')}
            leftIcon={<GroupIcon />}
          />
        </div>
      </Collapse>
    </Sidebar>
  );
}
