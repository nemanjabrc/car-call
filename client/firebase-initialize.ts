// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging';
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import { firebaseConfig } from "./firebase-config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

// Funkcija koja sluša dolazne poruke kada je aplikacija u fokusu
onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    
    toast(`⏰  ${payload.notification?.body}`, {
        autoClose: 10000,
        style: { padding: '20px' },
    });
});
