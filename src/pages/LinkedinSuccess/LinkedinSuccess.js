import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import linkedinAnimation from "../../Images/linkedinAnimation.json";
import MainNavBar from "../../components/MainNavBar";
import { incrementUserCredits } from "../../supportFunctions.js/FirebaseFunctions";
export default function LinkedinSucess() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: linkedinAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        await incrementUserCredits("linkedin", 100, user.uid);
        setTimeout(() => {
          navigate("/reports");
        }, 1500);
      }
    });
  }, [navigate, user]);

  return (
    <div>
      <MainNavBar />
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
}
