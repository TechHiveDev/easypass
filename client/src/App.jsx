import React from 'react';
import MyAdmin from './reactAdmin';
import { useRequestPermissionAndSendToken } from './utils/firebase/getToken';

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
  useRequestPermissionAndSendToken();
  return <MyAdmin />;
}

// ------------------------------------------------

export default App;
