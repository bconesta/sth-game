import { initializeApp } from "firebase/app";
import { NextResponse } from "next/server";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "sth-game",
  storageBucket: "sth-game.appspot.com",
  messagingSenderId: "905293756588",
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

console.log(app)

export function GET(){
    return NextResponse.json({ message: "Hello World"})
}