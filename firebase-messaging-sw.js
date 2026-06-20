importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDJLnUB8XnXWPEtSRAMuQr9ASmD16HLIJc",
    authDomain: "bishalshrestha17-de676.firebaseapp.com",
    projectId: "bishalshrestha17-de676",
    storageBucket: "bishalshrestha17-de676.firebasestorage.app",
    messagingSenderId: "631628771230",
    appId: "1:631628771230:web:389c6430535f6a46b6708f"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || 'Simha Notification';
    const options = {
        body: payload.notification?.body || 'You have a new notification',
        icon: '/favicon.ico',
        data: payload.data || {},
        requireInteraction: true,
        vibrate: [200, 100, 200]
    };
    self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.link || '/notifications.html';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(url) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});