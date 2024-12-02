import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export async function checkFavorite(
  email: string,
  favoriteId: string
): Promise<boolean> {
  // Kullanıcıyı email adresi ile sorgula
  const q = query(collection(db, "Users"), where("email", "==", email));

  const docSnap = await getDocs(q);
  let result = false;

  // Eğer kullanıcı bulunduysa
  docSnap.forEach((doc) => {
    const userData = doc.data();
    const favorites = userData.favorites || []; // Eğer favorites alanı varsa, yoksa boş bir array olarak başlat

    // Favorilerde belirtilen ID'nin olup olmadığını kontrol et
    if (favorites.includes(favoriteId)) {
      result = true;
    } else {
      result = false;
    }
  });
  return result;
}
