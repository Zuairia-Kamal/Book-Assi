import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [sessionRole, setSessionRole] = useState(null); 
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          localStorage.setItem("token", token);

          const res = await fetch(`http://localhost:3000/user?email=${currentUser.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setUser({ ...currentUser, ...data });
        } catch (err) {
          console.error("Fetch user failed", err);
          setUser(currentUser); // fallback
        }
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

const signIn = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const token = await result.user.getIdToken();
  localStorage.setItem("token", token);

  const res = await fetch(`http://localhost:3000/user?email=${email}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  setUser({ ...result.user, ...data, photoURL: data.photoURL || result.user.photoURL });

  // Prompt for role selection AFTER login
  promptRole();

  return result;
};

  

  const signUp = async (email, password, name, photoURL) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (name || photoURL) await updateProfile(result.user, { displayName: name, photoURL });

    const token = await result.user.getIdToken();
    localStorage.setItem("token", token);

    await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email, name, photo: photoURL }),
    });

    const res = await fetch(`http://localhost:3000/user?email=${email}`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setUser({ ...result.user, ...data });

    return result;
  };
const promptRole = () => {
  const role = window.prompt(
    "Select your role for this session: admin / librarian / customer",
    "customer"
  );
  const finalRole = ["admin", "librarian", "customer"].includes(role) ? role : "customer";
   setSessionRole(finalRole);
   setUser(prev => ({ ...prev, role: finalRole }));
};

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const token = await result.user.getIdToken();
  localStorage.setItem("token", token);

  await fetch("http://localhost:3000/user", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ email: result.user.email, name: result.user.displayName, photo: result.user.photoURL }),
  });

  const res = await fetch(`http://localhost:3000/user?email=${result.user.email}`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();

  setUser({ ...result.user, ...data });

  // Prompt role after login
  promptRole();

  toast.success("Google login successful!");
  return result.user;
};

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ user, loading, signIn,sessionRole, setSessionRole, promptRole, signUp, signInWithGoogle, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
