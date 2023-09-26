// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, addDoc, updateDoc, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkgIbTR-IsloHpqf1S5bTgjYvi6RU90ac",
  authDomain: "flashdecks-2e557.firebaseapp.com",
  databaseURL: "https://flashdecks-2e557-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flashdecks-2e557",
  storageBucket: "flashdecks-2e557.appspot.com",
  messagingSenderId: "22016442438",
  appId: "1:22016442438:web:86c537e9d0386f9657ca47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const collectionRef = collection(db, 'deck')

export async function getCards() {
  const snapshot = await getDocs(collectionRef);
  const cards = snapshot.docs.map(doc => ({
    id: doc.id, // Access the document ID
    data: doc.data(), // Access the document data
  }));
  return cards;
}

export async function addNewCard(front, back) {
  try {
    // Create a new card data object
    const newCard = {
      front,
      back,
      deck:1,
      lastUpdated: new Date(),
    };

    // Define the collection reference here
    const collectionRef = collection(db, 'deck'); // Replace 'deck' with your actual collection name

    // Add the new card to Firestore
    const docRef = await addDoc(collectionRef, newCard);

    // Return the ID of the newly created document (card)
    return docRef.id;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error; // Propagate the error for error handling in components
  }
}

export async function getDeckCards(deck) {
  const q = query(collectionRef, where("deck", "==", Number(deck)));
  const snapshot = await getDocs(q);
  const deckCards = snapshot.docs.map(doc => ({
    id: doc.id, // Access the document ID
    data: doc.data(), // Access the document data
  }));
  return deckCards;
}

export async function updateCard(cardId, increment) {
  try {
    // Get a reference to the card document in Firestore
    const cardRef = doc(collectionRef, cardId);
    // Fetch the existing card data
    const cardSnapshot = await getDoc(cardRef);

    if (cardSnapshot.exists()) {
      // Extract the existing card data
      const cardData = cardSnapshot.data();

      // Update the "deck" property by incrementing it
      cardData.deck = (cardData.deck || 0) + increment;

      // Update the card document in Firestore with the modified data
      await updateDoc(cardRef, cardData);
    }
  } catch (error) {
    console.error("Error updating card:", error);
  }
}
