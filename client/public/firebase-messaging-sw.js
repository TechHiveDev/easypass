importScripts(
  'https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js'
);
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyCM-MKKdGwC3XAtM-gCYsg_bJiVLwoqxeo',
  authDomain: 'easypass-test.firebaseapp.com',
  projectId: 'easypass-test',
  storageBucket: 'easypass-test.appspot.com',
  messagingSenderId: '176720501942',
  appId: '1:176720501942:web:8521372009ba8de5d15a17',
  measurementId: 'G-GPV3EWF9SD',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', {
    title: payload.notification.title,
    body: payload.notification.body,
  });
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
