import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllRecordsVerticalTabs from "../../components/AllRecordsVerticalTabs/AllRecordsVerticalTabs";
import MainNavBar from "../../components/MainNavBar";
import { fetchUserAllPackData } from "../../supportFunctions.js/FirebaseFunctions";
import "./ReportsPage.css";

export default function ReportsPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [allInterviewRecords, setAllInterviewRecords] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        await getAllInterviewRecords(user.uid);
      }
    });
  }, [navigate, user]);

  const getAllInterviewRecords = async (useruid) => {
    setLoading(true);
    fetchUserAllPackData(useruid)
      .then((fetchedRecords) => {
        setAllInterviewRecords(fetchedRecords);
        console.log(fetchedRecords);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="landingPage tyn-root">
      <MainNavBar />
      {!loading && (
        <div className="tyn-content">
          <div className="container mt-4">
            <AllRecordsVerticalTabs allInterviewRecords={allInterviewRecords} />
          </div>
        </div>
      )}
    </div>
  );
}
