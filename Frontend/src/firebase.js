// Written by Shlomi Ben-Shushan.

import { initializeApp } from "firebase/app";

const firebaseConfig = require('./config.json').firebase;

const firebase = initializeApp(firebaseConfig);

export default firebase;
