import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { Recipe } from "../../interfaces/interfaces";


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

export const addRecipeToDB = async (recipe: Recipe) => {
	const recipesCollectionRef = collection(db, 'recipes');
	const recipeDocRef = await addDoc(recipesCollectionRef, recipe);
	return recipeDocRef.id;
};

export const saveRecipeForUser = async (recipeId: string, userId: string, isFavorite: boolean) => {
	const userDocRef = doc(db, 'users', userId);

	await updateDoc(userDocRef, {
		saved: arrayUnion(recipeId)
	});

	if (isFavorite) {
		await updateDoc(userDocRef, {
			favorites: arrayUnion(recipeId)
		});
	}
};

export const unsaveRecipeForUser = async (recipeId: string, userId: string, wasFavorite: boolean) => {
	const userDocRef = doc(db, 'users', userId);

	await updateDoc(userDocRef, {
		saved: arrayRemove(recipeId)
	});

	if (wasFavorite) {
		await updateDoc(userDocRef, {
			favorites: arrayRemove(recipeId)
		});
	}
};
