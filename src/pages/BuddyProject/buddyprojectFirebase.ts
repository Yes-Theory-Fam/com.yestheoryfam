import firebase from "firebase/app";

// Imported for side effects; adding `firestore` to `firebase`.
import "firebase/firestore";

let _db: firebase.firestore.Firestore | null = null;

function initializeFirebase() {
  console.log("creating firebase db");
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT,
  };

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  // firebase.initializeApp(firebaseConfig);
  console.log("app ok, firestore next");

  _db = firebase.firestore();
  console.log("Created firestore db");
  return _db;
}

export const initDb: () => firebase.firestore.Firestore = () => (_db === null ? initializeFirebase() : _db);

export interface BuddyProjectSignup {
  discordUserId: string;
  discordUsername: string;
  displayName: string;
}

async function documentExists(id: string) {
  if (_db === null) {
    console.error("The database needs to be initialized first!");
    throw new Error("The database needs to be initialized first!");
  }
  const buddyDoc = await _db.collection("buddyproject").doc(id).get();
  return buddyDoc.exists;
}

export async function buddyProjectSignup(discordUsername: string, displayName: string, discordUserId: string) {
  if (_db === null) {
    console.error("The database needs to be initialized first!");
    throw new Error("The database needs to be initialized first!");
  }

  const firebaseUserId = btoa(discordUserId);
  const documentExistsCheck = await documentExists(firebaseUserId);
  if (documentExistsCheck) {
    return true;
  }

  const buddy: BuddyProjectSignup = {
    discordUserId,
    discordUsername,
    displayName,
  };

  _db.collection("buddyproject").doc(firebaseUserId).set(buddy);
  return true;
}

export async function fetchBuddyProjectSignup(discordUserId: string): Promise<BuddyProjectSignup | null> {
  if (_db === null) {
    console.error("The database needs to be initialized first!");
    return null;
    // return reject("The database needs to be initialized first!");
  }

  // Let's create a b64 of the discord userid (which won't change)
  // and use that as the identifier in firebase
  const firebaseUserId = btoa(discordUserId);

  const signup = await _db.collection("buddyproject").doc(firebaseUserId).get();
  if (signup.exists) {
    const data = signup.data();
    if (data !== null && data !== undefined) {
      return data as BuddyProjectSignup;
    }
  }

  return null;
}
