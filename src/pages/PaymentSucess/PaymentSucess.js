import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementUserCredits } from "../../supportFunctions.js/FirebaseFunctions";

export default function PaymentSucess() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        await incrementUserCredits(user.uid);
        navigate("/reports");
      }
    });
  }, [navigate, user]);

  return <div>PaymentSucess</div>;
}
