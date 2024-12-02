import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export const useFavoritePets = (email: string) => {
  const [favPets, setFavPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritePets = async () => {
      if (!email) return; // Early return if email is not provided

      try {
        setLoading(true);
        const usersRef = collection(db, "Users");
        const userQuery = query(usersRef, where("email", "==", email));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          userSnapshot.forEach(async (userDoc) => {
            const userData = userDoc.data();
            const favoriteIds = userData?.favorites || [];

            if (favoriteIds.length > 0) {
              // Fetch pets based on the favorite IDs
              const petsRef = collection(db, "Pets");
              const petsQuery = query(
                petsRef,
                where(documentId(), "in", favoriteIds)
              );
              const petsSnapshot = await getDocs(petsQuery);

              // Accumulate pets data
              const pets: any[] = [];
              petsSnapshot.forEach((petDoc) => {
                pets.push(petDoc.data());
              });

              // Update the state with the accumulated pets
              setFavPets(pets);
            } else {
              setFavPets([]); // No favorites found
            }
          });
        } else {
          console.log("User with email not found!");
          setFavPets([]); // If no user found, reset the favorites
        }
      } catch (error) {
        console.error("Error fetching favorite pets: ", error);
        setFavPets([]); // Reset in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePets();
  }, [email]); // Depend on email to re-run when it changes

  return { favPets, loading };
};
