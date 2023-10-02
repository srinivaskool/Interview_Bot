import React, { useState } from "react";
import Lottie from "react-lottie";
import bot1 from "../../Images/TeamImages/bot1.png";
import bot2 from "../../Images/TeamImages/bot2.png";
import dwarak2 from "../../Images/TeamImages/dwarak2.jpeg";
import dwarak3 from "../../Images/TeamImages/dwaraka3.jpg";
import srinivas1 from "../../Images/TeamImages/srinivas1.jpeg";
import srinivas2 from "../../Images/TeamImages/srinivas2.jpeg";
import bgHome1 from "../../Images/bgHome1.png";
import bgImg2 from "../../Images/bgImg2.jpeg";
import bgPattern from "../../Images/bgPattern.png";
import bgPatternLight from "../../Images/bgPatternLight.png";
import handsImage from "../../Images/handsImage.png";
import mainPageInterviewAnimation from "../../Images/mainPageInterviewAnimation.json";
import payment from "../../Images/payment.png";
import wave1 from "../../Images/wave1.png";
import wave2 from "../../Images/wave2.png";
import wave3 from "../../Images/wave3.png";
import { Icon } from '@iconify/react';
import MainNavBar from "../../components/MainNavBar";
import "./HomePage.css";

export default function HomePage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: mainPageInterviewAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleHover1 = () => {
    setIsHovered1(!isHovered1);
  };
  const handleHover2 = () => {
    setIsHovered2(!isHovered2);
  };
  const handleHover3 = () => {
    setIsHovered3(!isHovered3);
  };


  const [isCardHovered1, setIsCardHovered1] = useState(false);
  const [isCardHovered2, setIsCardHovered2] = useState(false);
  const [isCardHovered3, setIsCardHovered3] = useState(false);
  const [isCardHovered4, setIsCardHovered4] = useState(false);
  const [isCardHovered5, setIsCardHovered5] = useState(false);
  const [isCardHovered6, setIsCardHovered6] = useState(false);

  const handleCardHover1 = () => {
    setIsCardHovered1(!isCardHovered1);
  };
  const handleCardHover2 = () => {
    setIsCardHovered2(!isCardHovered2);
  };
  const handleCardHover3 = () => {
    setIsCardHovered3(!isCardHovered3);
  };
  const handleCardHover4 = () => {
    setIsCardHovered4(!isCardHovered4);
  };
  const handleCardHover5 = () => {
    setIsCardHovered5(!isCardHovered5);
  };
  const handleCardHover6 = () => {
    setIsCardHovered6(!isCardHovered6);
  };

  return (
    <div className="home_page">
      <MainNavBar />
      <section id="herosection home"
        className="section bg-home home-half"
        style={{
          backgroundImage: `url(${bgHome1})`,
          // marginTop: "72px",
        }}
      >
        <div className="bg-overlay" />
        <div className="display-table">
          <div className="display-table-cell">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 text-white text-center col-lg-8 offset-lg-2">
                  <h1 className="home-title">
                    Elevate Your Interview Skills with AI
                  </h1>
                  <p className="pt-3 home-desc">
                    Master your software interviews with AI-driven mock interviews that offer personalized real-time feedback, and limitless practice to ace your next interview.
                  </p>
                  <p className="play-shadow mt-4">
                    <a className="play-btn video-play-icon" href="/home-two">
                      <Icon icon="mdi:play" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-effect wave-anim">
          <div className="waves-shape shape-one">
            <div
              className="wave wave-one"
              style={{
                backgroundImage: `url(${wave1})`,
              }}
            />
          </div>
          <div className="waves-shape shape-two">
            <div
              className="wave wave-two"
              style={{
                backgroundImage: `url(${wave2})`,
              }}
            />
          </div>
          <div className="waves-shape shape-three">
            <div
              className="wave wave-three"
              style={{
                backgroundImage: `url(${wave3})`,
              }}
            />
          </div>
        </div>
      </section>
      <br /> <br /> <br />
      <section id="ourservices services" className="section serviceSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="section-title text-center">We Provide</h1>
              <div className="section-title-border mt-3" />
              <p className="section-subtitle text-muted text-center pt-4 font-secondary">
                Explore a suite of features designed to help you master software engineering interviews from start to finish.
              </p>
            </div>
          </div>
          <div className="mt-4 row">
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect" onMouseEnter={handleCardHover1} onMouseLeave={handleCardHover1}>
                <img src={isCardHovered1 ? 'card1-init-50.png' : 'card1-final-50.png'} />
                <h4 className="pt-3">Real-Time Feedback</h4>
                <p className="pt-3 text-muted">
                  Receive instant, AI-generated feedback after every practice session to fine-tune your interview skills on the spot.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect" onMouseEnter={handleCardHover2} onMouseLeave={handleCardHover2}>
                <img src={isCardHovered2 ? 'card2-init-50.png' : 'card2-final-50.png'} />
                <h4 className="pt-3">Personalized Insights</h4>
                <p className="pt-3 text-muted">
                  Unlock tailored insights that pinpoint your unique strengths and areas for improvement.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect" onMouseEnter={handleCardHover3} onMouseLeave={handleCardHover3}>
                <img src={!isCardHovered3 ? 'card3-init-50.png' : 'card3-final-50.png'} />
                <h4 className="pt-3">Customized Practice</h4>
                <p className="pt-3 text-muted">
                  Customize mock interviews to mirror your upcoming interview scenarios, ensuring relevant preparation.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 row">
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect" onMouseEnter={handleCardHover4} onMouseLeave={handleCardHover4}>
                <img src={!isCardHovered4 ? 'card4-init-50.png' : 'card4-final-50.png'} />
                <h4 className="pt-3">Resume Analysis</h4>
                <p className="pt-3 text-muted">
                  Get personalized resume reviews and interview questions to match your skills to job requirements.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect" onMouseEnter={handleCardHover5} onMouseLeave={handleCardHover5}>
                <img src={!isCardHovered5 ? 'card5-init-50.png' : 'card5-final-50.png'} />
                <h4 className="pt-3">Comprehensive Interview Simulation</h4>
                <p className="pt-3 text-muted">
                  Practice full interviews, including technical questions, resume reviews, and DSA / SD problems.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect" onMouseEnter={handleCardHover6} onMouseLeave={handleCardHover6}>
                <img src={!isCardHovered6 ? 'card6-init-50.png' : 'card6-final-50.png'} />
                <h4 className="pt-3">Interviewer Cross-Questioning</h4>
                <p className="pt-3 text-muted">
                  Hone your problem-solving with AI Interviewer cross-questioning under pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section >
      <section id="interviewlotteanimaiton features" className="section bg-light iphoneSection" >
        <div className="container">
          <div className="vertical-content row">
            <div className="col-lg-5">
              <div className="features-box">
                <h3>
                  Unleash Your Interview Potential
                </h3>
                <p className="text-muted web-desc">
                  We revolutionize interview preparation with AI-driven mock interviews. Elevate your skills and help you ace your next software engineering interview.
                </p>
                <ul className="text-muted list-unstyled mt-4 features-item-list">
                  <li className="">Instant, AI-generated feedback for real-time improvement.</li>
                  <li className="">
                    Tailored insights pinpoint unique strengths and weaknesses.
                  </li>
                  <li className="">
                    Customize practice to match your interview scenario.
                  </li>
                  <li className="">Challenge yourself with real-world interview simulation.</li>
                </ul>
                <a
                  className="btn btn-primary mt-4 waves-effect waves-light"
                  href="/home-two"
                >
                  Get started{" "}
                </a>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="features-img features-right text-end">
                <Lottie options={defaultOptions} height={500} width={500} />
                {/* <img src={onlineWorld} alt="macbook" className="img-fluid" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="buildyourdreamwebsite"
        className="section section-lg bg-web-desc"
        style={{
          backgroundImage: `url(${handsImage})`,
          backgroundPosition: "left top",
          padding: "100px 0",
        }}
      >
        <div className="bg-overlay" />
        <div className="container">
          <div className="row">
            <div className="text-center col-lg-12">
              <h2 className="text-white"> AI-Powered Wisdom, Humanized Approach.
              </h2>
              <p className="pt-3 home-desc">
                Why settle for less? Select an interview partner who embodies vast knowledge and unbiased evaluation.
                Leave mediocrity behind, opt for AI, your superior interviewer with unmatched knowledge and precision.
              </p>
              <a
                className="btn btn-white mt-4 waves-effect waves-light mb-5"
                href="/home-two"
              >
                Level Up
              </a>
            </div>
          </div>
        </div>
        <div className="bg-pattern-effect">
          <img src={bgPattern} alt="dorsin" />
        </div>
      </section>
      <section id="testimonials testi" className="section iphoneSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="section-title text-center">WHAT THEY'VE SAID</h1>
              <div className="section-title-border mt-3" />
              <p className="section-subtitle text-muted text-center pt-4 font-secondary">
                Discover the impact of EvaluAItor through the words of our satisfied users. Hear from those who've succeeded with EvaluAItor. Discover how our platform transformed their interview experiences and careers.
              </p>
            </div>
          </div>
          <div className="mt-5 row">
            <div className="col-lg-4">
              <div className="testimonial-box hover-effect mt-4">
                <img
                  src="t1.jpeg"
                  alt="client"
                  className="img-fluid d-block img-thumbnail rounded-circle"
                />
                <div className="testimonial-decs">
                  <p className="text-muted text-center mb-0">
                    “It's a game-changer for mastering software engineering interviews. Thanks to EvaluAItor which made interviews less daunting.”{" "}
                  </p>
                </div>
                <h5 className="text-center text-uppercase pt-3">
                  Kotikalapudi Karthik -{" "}
                  <span className="text-muted text-capitalize">Flipkart</span>
                </h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-box hover-effect mt-4">
                <img
                  src="t2.jpeg"
                  alt="client"
                  className="img-fluid d-block img-thumbnail rounded-circle"
                />
                <div className="testimonial-decs">
                  <p className="text-muted text-center mb-0">
                    “Unmatched guidance and insights! Personalized feedback boosted my confidence. Thanks, EvaluAItor for guiding me!”{" "}
                  </p>
                </div>
                <h5 className="text-center text-uppercase pt-3">
                  Rikil Gajarla -{" "}
                  <span className="text-muted text-capitalize">Amazon</span>
                </h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-box hover-effect mt-4">
                <img
                  src="t3.jpeg"
                  alt="client"
                  className="img-fluid d-block img-thumbnail rounded-circle"
                />
                <div className="testimonial-decs">
                  <p className="text-muted text-center mb-0">
                    “This website turned my interview fears into confidence. I aced the technical & DSA questions and landed my dream job! ”{" "}
                  </p>
                </div>
                <h5 className="text-center text-uppercase pt-3">
                  Sumedha Acharya  -{" "}
                  <span className="text-muted text-capitalize">Google</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="workprocess" className="section bg-light iphoneSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="section-title text-center">INTERVIEW PROCESS</h1>
              <div className="section-title-border mt-3" />
              <p className="section-subtitle text-muted text-center pt-4 font-secondary">
                Our interview process is designed to mimic a real software engineering interview, providing a comprehensive and effective preparation experience.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="text-center process-left-icon-1 col-lg-6">

            </div>
            <div className="text-center process-left-icon-2 col-lg-6">

            </div>
          </div>

          <div className="mt-5 row">
            <div className="plan-line col-lg-4">
              <div className="text-center process-box">
                <br />
                <img src='cv.png' />
                <h4 className="pt-3">Personalized Resume Introduction</h4>
                <p className="text-muted">
                  Your story, your skills, your potential.
                </p>
              </div>
            </div>
            <div className="plan-line col-lg-4">
              <div className="text-center process-box">
                <br />
                <img src='theory.png' />
                <h4 className="pt-3">Theoretical Proficiency Assessment</h4>
                <p className="text-muted">Testing your conceptual understanding.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center process-box">
                <br />
                <img src='dsa.png' />
                <h4 className="pt-3">DSA Mastery Assessment</h4>
                <p className="text-muted">Prove your algorithmic skills.</p>
              </div>
            </div>
            <div className="text-center mx-auto">
              <a
                className="btn btn-primary waves-light waves-effect mt-5"
                href="/home-two"
              >
                Get Started <Icon icon="mdi:arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        id="letsgetstarted"
        className="section section-lg bg-get-start iphoneSection"
        style={{
          backgroundImage: `url(${bgImg2})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-overlay" />
        <div className="container">
          <div className="row">
            <div className="text-center col-lg-8 offset-lg-2">
              <h1 className="get-started-title text-white">
                Resume Analysis and Enhancement
              </h1>
              <div className="section-title-border mt-4 bg-white" />
              <p className="section-subtitle font-secondary text-white text-center pt-4">
                Discover your strengths, identify weaknesses, and receive actionable suggestions for improvement. Compare your resume to job descriptions, and get personalized recommendations to align perfectly with your dream job.
              </p>
              <a
                className="btn btn-white waves-effect mt-3 mb-4"
                href="https://interview-ai.streamlit.app/"
                target="_blank"
              >
                Evaluate yours now
              </a>
            </div>
          </div>
        </div>
        <div className="bg-pattern-effect">
          <img src={bgPatternLight} alt="pattern" />
        </div>
      </section>
      <br /><br /><br />
      <section id="ourteam" className="mb-5 mt-3 text-center container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="section-title text-center">BUILT BY</h1>
              <div className="section-title-border mt-3" />
              <br /><br />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          {/* Column 1*/}
          <div className="column col-lg-4">
            <div
              className={`card ${isHovered1 ? "hovered" : ""}`}
              onMouseEnter={handleHover1}
              onMouseLeave={handleHover1}
            >
              <div className="img-container">
                <img
                  src={isHovered1 ? dwarak3 : dwarak2}
                  alt={isHovered1 ? "Image 2" : "Image 1"}
                />
              </div>
              <h3>Dwaraka Poreddy</h3>
              <p>Co-Founder & Developer</p>
              <div className="icons">
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fab fa-github" />
                </a>
                <a href="#">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
          {/* Column 2*/}
          <div className="column col-lg-4">
            <div
              className={`card ${isHovered2 ? "hovered" : ""}`}
              onMouseEnter={handleHover2}
              onMouseLeave={handleHover2}
            >
              <div className="img-container">
                <img
                  src={isHovered2 ? srinivas1 : srinivas2}
                  alt={isHovered2 ? "Image 2" : "Image 1"}
                />
              </div>
              <h3>Srinivas Konduri </h3>
              <p>Founder & Developer</p>
              <div className="icons">
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fab fa-github" />
                </a>
                <a href="#">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
          {/* Column 3*/}
          <div className="column col-lg-4">
            <div
              className={`card ${isHovered3 ? "hovered" : ""}`}
              onMouseEnter={handleHover3}
              onMouseLeave={handleHover3}
            >
              <div className="img-container">
                <img
                  src={isHovered3 ? bot2 : bot1}
                  alt={isHovered3 ? "Image 2" : "Image 1"}
                />
              </div>
              <h3>AI Bot</h3>
              <p>I run the show! They? Clueless 😜</p>
              <div className="icons">
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fab fa-github" />
                </a>
                <a href="#">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /><br /><br />
      <footer className="footer section">
        <div className="bg-overlay" />
        <div className="container">
          <div className="row">
            <div className="mt-4 col-lg-3">
              <h4>DORSIN</h4>
              <div className="text-muted mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <a href="/home-two">Home</a>
                  </li>
                  <li>
                    <a href="/home-two">About us</a>
                  </li>
                  <li>
                    <a href="/home-two">Careers</a>
                  </li>
                  <li>
                    <a href="/home-two">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 col-lg-3">
              <h4>Information</h4>
              <div className="text-muted mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <a href="/home-two">Terms &amp; Condition</a>
                  </li>
                  <li>
                    <a href="/home-two">About us</a>
                  </li>
                  <li>
                    <a href="/home-two">Jobs</a>
                  </li>
                  <li>
                    <a href="/home-two">Bookmarks</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 col-lg-3">
              <h4>Support</h4>
              <div className="text-muted mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <a href="/home-two">FAQ</a>
                  </li>
                  <li>
                    <a href="/home-two">Contact</a>
                  </li>
                  <li>
                    <a href="/home-two">Disscusion</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 col-lg-3">
              <h4>Subscribe</h4>
              <div className=" mt-4">
                <p>
                  In an ideal world this text wouldn’t exist, a client would
                  acknowledge the importance of having web copy before the
                  design starts.
                </p>
              </div>
              <form className="subscribe">
                <input
                  placeholder="Email"
                  className="form-control text-secondary"
                  required=""
                />
                <a className="submit" href="/home-two">
                  <i className="pe-7s-paper-plane" />
                </a>
              </form>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-alt section">
        <div className="bg-overlay1" />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="float-start pull-none">
                <p className="copy-rights text-muted">
                  September - 2023 © Evalu<b>AI</b>tor
                </p>
              </div>
              <div className="float-end pull-none">
                <img src={payment} alt="payment" height={36} />
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
