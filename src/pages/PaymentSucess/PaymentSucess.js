import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import successAnimation from "../../Images/successAnimation.json";
import { incrementUserCredits } from "../../supportFunctions.js/FirebaseFunctions";
export default function PaymentSucess() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        await incrementUserCredits(user.uid);
        setTimeout(() => {
          navigate("/reports");
        }, 1500);
      }
    });
  }, [navigate, user]);

  return (
    <div>
      {" "}
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
}
