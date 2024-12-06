import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhLzHppRMKUuz9EIuHPE0Q9ShyduOhc18",
  authDomain: "love-proposal-app.firebaseapp.com",
  databaseURL: "https://love-proposal-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "love-proposal-app",
  storageBucket: "love-proposal-app.appspot.com",
  messagingSenderId: "317523174693",
  appId: "317523174693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };