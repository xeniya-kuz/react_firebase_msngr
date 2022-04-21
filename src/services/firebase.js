import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCt16Yuh3Rs5P2IKemc0e5ejhNx-2y6Dbg",
    authDomain: "msngr-with-react.firebaseapp.com",
    projectId: "msngr-with-react",
    storageBucket: "msngr-with-react.appspot.com",
    messagingSenderId: "555529133688",
    appId: "1:555529133688:web:bd32d51888ef140f0a178d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// авторизация и ее разные действия
export const auth = getAuth(app);

export const register = async (email, pass) => await createUserWithEmailAndPassword(auth, email, pass);
export const logIn = async (email, pass) => await signInWithEmailAndPassword(auth, email, pass);
export const logOut = async () => await signOut(auth);

export const database = getDatabase(app);

export const userRef = ref(database, 'user');
export const chatsRef = ref(database, 'chatList');
export const getChatRefById = (id) => ref(database, `chatList/${id}`);

export const messagesRef = ref(database, 'messages');
export const getMsgsRefByChatId = (chatId) => ref(database, `messages/${chatId}`);
export const getMessageRefById = (chatId, msgId) =>
    ref(database, `messages/${chatId}/${msgId}`);
