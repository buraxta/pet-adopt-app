import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export async function addUser(email: string) {
  try {
    const docRef = await addDoc(collection(db, "Users"), {
      email: email,
      favorites: [],
    });
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}

export async function toggleFavorite(email: string, favoriteId: string) {
  try {
    // Email ile `Users` koleksiyonunda kullanıcıyı sorguluyoruz
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // Eğer kullanıcı bulunduysa
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (userDoc) => {
        const userId = userDoc.id; // User ID'sini alıyoruz (Firestore belge ID'si)
        const userData = userDoc.data();
        const favorites = userData?.favorites || [];

        // Favorilerde belirtilen `favoriteId` var mı kontrol et
        if (favorites.includes(favoriteId)) {
          // Eğer varsa, favorilerden kaldır
          const updatedFavorites = favorites.filter((id) => id !== favoriteId);
          await updateDoc(doc(db, "Users", userId), {
            favorites: updatedFavorites,
          });
        } else {
          // Eğer yoksa, favorilere ekle
          const updatedFavorites = [...favorites, favoriteId];
          await updateDoc(doc(db, "Users", userId), {
            favorites: updatedFavorites,
          });
        }
      });
    } else {
      console.log("User with email " + email + " not found!");
    }
  } catch (e) {
    console.error("Error updating favorite: ", e);
  }
}
