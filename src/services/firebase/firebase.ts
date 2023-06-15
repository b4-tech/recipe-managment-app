import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";


const firebaseConfig = {
	apiKey: "AIzaSyAKDxhX0RbNoQmW8IZH3Uou_HAChVigQn4",
	authDomain: "recipe-management-db.firebaseapp.com",
	projectId: "recipe-management-db",
	storageBucket: "recipe-management-db.appspot.com",
	messagingSenderId: "74876283834",
	appId: "1:74876283834:web:89215d7d86a46d63900b83"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createAccount = async (
	username: string,
	email: string,
	password: string
) => {
	try {
		if (!username || !email || !password) return;

		const { user } = await createUserWithEmailAndPassword(auth, email, password);

		if (user) {
			const userDocRef = doc(db, 'users', user.uid);
			await setDoc(userDocRef, {
				username,
				email,
				favorites: [],
				saved: []
			});

			return {
				email: user.email,
				username: user.displayName,
				userId: user.uid,
				favorites: [],
				saved: [],
			};
		}
	} catch (error) {
		console.error("Error creating account:", error);
	}
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	try {
		if (!email || !password) return;

		const credential = await signInWithEmailAndPassword(auth, email, password);

		const user = credential.user;
		if (!user) throw new Error("User not found");

		const userDocRef = doc(db, 'users', user.uid);
		const userDoc = await getDoc(userDocRef);
		const userData = userDoc.data();

		return {
			email: user.email,
			username: user.displayName,
			userId: user.uid,
			favorites: userData ? userData.favorites : [],
			saved: userData ? userData.saved : [],
		}
	} catch (error) {
		console.error("Error signing in:", error);
	}
};

export const signOutUser = async () => await signOut(auth);