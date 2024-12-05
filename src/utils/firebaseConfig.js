// src/utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCfYmk9rI9YBk15BBpFsgy8Uk1wPpnMNTE",
    authDomain: "streammanage-f2029.firebaseapp.com",
    projectId: "streammanage-f2029",
    storageBucket: "streammanage-f2029.firebasestorage.app",
    messagingSenderId: "164211696905",
    appId: "1:164211696905:web:af9b97132e9e5062169fd8",
    measurementId: "G-49NCH6TCFQ"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { db, messaging, getToken, onMessage };