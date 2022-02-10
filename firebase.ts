// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAgB7Q0Wz0kZwKPos5R4LaPyRyBsfy2to0",
    authDomain: "fitness-app-d6296.firebaseapp.com",
    databaseURL: "https://fitness-app-d6296-default-rtdb.firebaseio.com",
    projectId: "fitness-app-d6296",
    storageBucket: "fitness-app-d6296.appspot.com",
    messagingSenderId: "59069276990",
    appId: "1:59069276990:web:d5f7d6b991aa933499026f",
    measurementId: "G-320EX2ZKN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//const analytics = getAnalytics(app);

export default database;
