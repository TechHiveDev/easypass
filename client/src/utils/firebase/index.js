import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCM-MKKdGwC3XAtM-gCYsg_bJiVLwoqxeo',
  authDomain: 'easypass-test.firebaseapp.com',
  projectId: 'easypass-test',
  storageBucket: 'easypass-test.appspot.com',
  messagingSenderId: '176720501942',
  appId: '1:176720501942:web:8521372009ba8de5d15a17',
  measurementId: 'G-GPV3EWF9SD',
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
