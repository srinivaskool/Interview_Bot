import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InterviewBot from "./pages/InterviewBot/InterviewBot";
import LandingPage from "./pages/LandingPage/LandingPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
            displayName: user.displayName
          },
        });
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/interview/intro"
          element={<InterviewBot isThisDSARoundPage={false} isThisResumeRoundPage={false}/>}
        />
        <Route
          path="/interview/resume"
          element={<InterviewBot isThisDSARoundPage={false} isThisResumeRoundPage={true}/>}
        />
        <Route
          path="/interview/dsaaround"
          element={<InterviewBot isThisDSARoundPage={true} isThisResumeRoundPage={false}/>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/register/complete" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
