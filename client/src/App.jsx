import React from 'react';
import { useNotify } from 'react-admin';
import { onMessage } from 'firebase/messaging';
import MyAdmin from './reactAdmin';
import { useRequestPermissionAndSendToken } from './utils/firebase/useRequestPermissionAndSendToken';
import { messaging } from './utils/firebase';

// ------------------------------------------------

// set initial direction
const locale = JSON.parse(localStorage.getItem('RaStore.locale')) || 'en';
document.dir = locale === 'en' ? 'ltr' : 'rtl';

// set initial backgroundColor for dark mode
const initiallyDarkMode = JSON.parse(localStorage.getItem('RaStore.theme'))
  ?.palette?.mode;
document.body.style.backgroundColor =
  initiallyDarkMode === 'dark' ? '#000' : '#fafafb';

// ------------------------------------------------

function App() {
  const notify = useNotify();

  useRequestPermissionAndSendToken();
  onMessage(messaging, (payload) => {
    notify(JSON.stringify(payload));
  });
  return <MyAdmin />;
}

// ------------------------------------------------

export default App;
