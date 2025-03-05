// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging';
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFym9u0T0-HzGRitV__HozXfZ35MQJLCE",
  authDomain: "car-call-29ebb.firebaseapp.com",
  projectId: "car-call-29ebb",
  storageBucket: "car-call-29ebb.firebasestorage.app",
  messagingSenderId: "712326170696",
  appId: "1:712326170696:web:19ff4886e7b9e68845707d",
  measurementId: "G-7BNEF66SMV"
};

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
