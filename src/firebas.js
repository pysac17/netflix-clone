import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB-egJvaqv-4EWelCC4LCKtO8NUAZaY970",
    authDomain: "netflix-clone-adf30.firebaseapp.com",
    projectId: "netflix-clone-adf30",
    storageBucket: "netflix-clone-adf30.appspot.com",
    messagingSenderId: "1065262699866",
    appId: "1:1065262699866:web:9200535075a2f3bcfd8f63",
    measurementId: "G-QKVC94YDN3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export default app;