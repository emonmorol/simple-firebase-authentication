import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGooglePopUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })

      .catch((error) => console.error(error));
  };
  const handleGithubPopUp = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })

      .catch((error) => console.error(error));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <div>
          <button onClick={handleGooglePopUp}>Google Sign In</button>
          <button onClick={handleGithubPopUp}>Github Sign In</button>
        </div>
      )}

      <h2>{user.displayName}</h2>
      <p>Email : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
