import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import InterviewBot from "./pages/InterviewBot/InterviewBot";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/auth/Login";

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
            uid: user.uid,
            profilepic: user.photoURL,
          },
        });
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/interview" element={<InterviewBot />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
