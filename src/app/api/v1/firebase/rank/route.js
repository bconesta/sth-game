import { NextResponse } from 'next/server';
import { child, get, getDatabase, ref, set } from 'firebase/database'
import { initializeApp } from 'firebase/app';

import { v4 as uuid } from 'uuid';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: "sth-game",
    storageBucket: "sth-game.appspot.com",
    messagingSenderId: "905293756588",
    appId: process.env.FIREBASE_APP_ID
};
  
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export async function GET(){
    const data = await get(child(ref(database), `rank`))
    return NextResponse.json(data)
}

export async function PUT(req, res){
    const putData = await req.json()

    if(!putData.user || !putData.game || !putData.value){
        return NextResponse.json({ error : "Missing data" }, { status : 400 })
    }

    const data = await get(child(ref(database), `rank`));
    
    const time = new Date;
    const date = time.toISOString().split("T")[0]

    const newScore = { uid : uuid(), user : putData.user, value : putData.value }

    //If there is no rank for this date or this game, create it
    if(!data.val()[date] || !data.val()[date][putData.game]){
        await set(child(ref(database), `rank/${date}/${putData.game}`), [newScore])
    }
    //If there is a rank for this date and this game, update it
    else{
        const newRank = [];
        const oldRank = data.val()[date][putData.game];
        
        oldRank.forEach((score) => {
            if(score.value < newScore.value && !newRank.includes(newScore)){
                newRank.push(newScore);
                newRank.push(score);
            }
            else if(!newRank.includes(score)){
                newRank.push(score);
            }
        });

        if(!newRank.includes(newScore) && newRank.length < 10){
            newRank.push(newScore);
        }
        else if(newRank.length > 10){
            newRank.pop();
        }

        await set(child(ref(database), `rank/${date}/${putData.game}`), newRank)
    }

    return NextResponse.json({ data })
}

