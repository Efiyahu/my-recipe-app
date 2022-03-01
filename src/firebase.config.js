import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyARIdn3RTf6i8rlrnwGeK6qrVExIrVhTFU',
  authDomain: 'portfolio-meals-app.firebaseapp.com',
  projectId: 'portfolio-meals-app',
  storageBucket: 'portfolio-meals-app.appspot.com',
  messagingSenderId: '521163357140',
  appId: '1:521163357140:web:d39341e3bcf925b5497441',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
