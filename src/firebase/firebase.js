import {initializeApp } from "firebase/app";
import {
        GoogleAuthProvider,
        getAuth,
        signInWithPopup,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        signOut,
        EmailAuthProvider,
} from "firebase/auth";
import {reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { data } from "autoprefixer";
const firebaseConfig = {
    apiKey: "AIzaSyADIeFkZCwAUDdChxmnAx-O_3G_0l_UPLY",
    authDomain: "foodify-eaa30.firebaseapp.com",
    projectId: "foodify-eaa30",
    storageBucket: "foodify-eaa30.appspot.com",
    messagingSenderId: "1020648063167",
    appId: "1:1020648063167:web:6f95e8028ab05df520860a",
    measurementId: "G-8SLHQ0KHJG"
  };

const app = initializeApp(firebaseConfig);


//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password, phone) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phone,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

//
const reauthenticate = async(currentPassword) => {
  //const auth = getAuth(app);
  var user = auth.currentUser;
  var cred = EmailAuthProvider.credential(
      user.email, currentPassword);
  return await reauthenticateWithCredential(user, cred);
};

const changePassword = (currentPassword, newPassword) => {
  reauthenticate(currentPassword).then(() => {
    var user = auth.currentUser;
    updatePassword(user, newPassword).then(() => {
      alert("Password updated!");
      logout();
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); });
};
const updateProfile = async(id, newName, newPhone) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", id));
    const docRef = await getDocs(q);
    const key = docRef.docs[0].id;
    const ref = doc(db, "users", key);
    console.log(ref);
    await updateDoc(ref, {
      name: newName,
      phone: newPhone,
    });
    alert("Data Updated");
  } catch (err) {
    console.error(err);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  changePassword,
  updateProfile,
};

export default db;