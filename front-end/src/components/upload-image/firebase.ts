import { getStorage } from "firebase/storage";
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyBiUE-VtGBKQ7c2IcW-05Lv9yVlX7xNO00",
    authDomain: "intro2software-project.firebaseapp.com",
    projectId: "intro2software-project",
    storageBucket: "intro2software-project.appspot.com",
    messagingSenderId: "602160962841",
    appId: "1:602160962841:web:c8b00d25f66675970ab988",
    name: "Intro2software-Project",
    options: {},
    automaticDataCollectionEnabled: false
};

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);
export default firebaseStorage;