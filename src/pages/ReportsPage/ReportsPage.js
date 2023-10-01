import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authorizationCode = searchParams.get('code');

    // Check if the authorizationCode exists before making the API call
    if (authorizationCode) {
      // ADD 100 credits to their account 
    }
  }, []);
  
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
  const linkLinkedinProfile = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86agn2chxp9rtd&redirect_uri=http://localhost:3000/linkedin/success&scope=openid,profile,email`;
    window.location.href = authUrl;
  };

  return (
    <div className="landingPage tyn-root">
      <MainNavBar />
      {!loading && (
        <div className="tyn-content">
          <div className="container mt-4">
          <Link to="https://buy.stripe.com/3csfZj3g25QO6pW3cc" className="btn btm-primary btn-small">Add credits</Link>
            <button onClick={()=>{
              linkLinkedinProfile()
            }} className="btn btm-secondary btn-small">Add Linked Profile</button>
            <AllRecordsVerticalTabs allInterviewRecords={allInterviewRecords} />
          </div>
        </div>
      )}
    </div>
  );
}
