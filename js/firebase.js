import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGtaYv3aoWCgIgRfolj8vsOcihKCVc39k",
  authDomain: "kampung-parakanceuri.firebaseapp.com",
  projectId: "kampung-parakanceuri",
  storageBucket: "kampung-parakanceuri.firebasestorage.app",
  messagingSenderId: "292542466143",
  appId: "1:292542466143:web:94d68782579f66060373ea"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
