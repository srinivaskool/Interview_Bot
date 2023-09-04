import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNavBar from "../../components/MainNavBar";
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function updateRedirectRedux(destination) {
    dispatch({
      type: "LOGIN_REDIRECT",
      payload: destination,
    });
    navigate(destination);
  }
  return (
    <div className="landingPage">
      <MainNavBar />
      <main>
        <div className="jumbotron">
          <div className="container">
            <h1>We are Broadway</h1>
            <a href="#options" className="btn-main">
              {" "}
              Get Started{" "}
            </a>
          </div>
        </div>
      </main>
      <section className="supporting" id="options">
        <div className="container">
          <div className="col">
            <img src="https://content.codecademy.com/projects/broadway/design.svg" />
            <h2>Interview</h2>
            <p>Make your projects look great and interact beautifully.</p>
            <h6 onClick={() => updateRedirectRedux("/interview")} >
              {" "}
              Lets go
            </h6>
            <br />
          </div>
          <div className="col">
            <img src="https://content.codecademy.com/projects/broadway/develop.svg" />
            <h2>Develop</h2>
            <p>Use modern tools to turn your design into a web site</p>
            <h6 href="#"> Learn More</h6>
            <br />
          </div>
          <div className="col">
            <img src="https://content.codecademy.com/projects/broadway/deploy.svg" />
            <h2>Deploy</h2>
            <p>Use modern tools to turn your design into a web site</p>
            <h6 href="#"> Learn More</h6>
            <br />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
