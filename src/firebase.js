import { initializeApp } from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import {
	getFirestore,
	getDocs,
	collection,
	doc,
	onSnapshot,
	deleteDoc,
	addDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Fireba se products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export const getUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				unsubscribe();
				resolve(user);
			},
			reject
		);
	});
};

export const signInWithGoogle = (callback) => {
	signInWithPopup(auth, googleProvider)
		.then((res) => {
			callback(res.user);
		})
		.catch((e) => {
			console.log(e);
		});
};

// fonts related

export const useFontsListener = async (callback) => {
	return onSnapshot(collection(db, "fonts"), (snapshot) => {
		const fonts = snapshot.docs.map((font) => ({
			id: font.id,
			...font.data(),
		}));

		callback(fonts);
	});
};

export const addFont = async (family) => {
	await addDoc(collection(db, "fonts"), {
		family,
	});
};

export const deleteFont = async (id) => {
	await deleteDoc(doc(db, "fonts", id));
};
