import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, signInWithEmailAndPassword, setPersistence, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@vueuse/firebase/useAuth";

const app = initializeApp({
    authDomain: import.meta.env.VITE_FIREBASE_WEB_AUTH_DOMAIN,
    apiKey: import.meta.env.VITE_FIREBASE_WEB_API_KEY,
});

const email = ref("");
const password = ref("");

const auth = getAuth(app);
const { isAuthenticated, user } = useAuth(auth);
const signIn = async () => {
    return await setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email.value, password.value);
        })
        .catch((error) => {
            throw error;
        });
};

export function useFirebaseAuth() {
    return {
        app,
        email,
        password,
        isAuthenticated,
        user,
        signIn,
        auth,
        onAuthStateChanged
    }
}