import React from 'react';
import { AdminContext } from 'react-admin';
import MyAdmin from './reactAdmin';
import { useRequestPermissionAndSendToken } from './utils/firebase/useRequestPermissionAndSendToken';
import i18nProvider from './utils/translation/i18nProvider';
import { dataProvider } from './reactAdmin/providers/data.provider.hook';
import { authProvider } from './reactAdmin/providers/auth.provider.hook';

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
  return (
    <AdminContext {...{ i18nProvider, dataProvider, authProvider }}>
      <MyAdmin />
    </AdminContext>
  );
}

// ------------------------------------------------

export default App;
