import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                    We help startups launch their products
                  </h1>
                  <p className="pt-3 home-desc">
                    Etiam sed.Interdum consequat proin vestibulum class at.
                  </p>
                  <p className="play-shadow mt-4">
                    <a className="play-btn video-play-icon" href="/home-two">
                      <i className="mdi mdi-play text-center" />
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
      <section id="ourservices services" className="section serviceSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="section-title text-center">Our Services</h1>
              <div className="section-title-border mt-3" />
              <p className="section-subtitle text-muted text-center pt-4 font-secondary">
                We craft digital, graphic and dimensional thinking, to create
                category leading brand experiences that have meaning and add a
                value for our clients.
              </p>
            </div>
          </div>
          <div className="mt-4 row">
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-diamond text-primary" />
                <h4 className="pt-3">Digital Design</h4>
                <p className="pt-3 text-muted">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content. Moltin gives you the platform.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-display2 text-primary" />
                <h4 className="pt-3">Unlimited Colors</h4>
                <p className="pt-3 text-muted">
                  Credibly brand standards compliant users without extensible
                  services. Anibh euismod tincidunt ut laoreet.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-piggy text-primary" />
                <h4 className="pt-3">Strategy Solutions</h4>
                <p className="pt-3 text-muted">
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean necessary regelialia.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 row">
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-science text-primary" />
                <h4 className="pt-3">Awesome Support</h4>
                <p className="pt-3 text-muted">
                  It is a paradisematic country, in which roasted parts of
                  sentences fly into your mouth leave for the far World.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-news-paper text-primary" />
                <h4 className="pt-3">Truly Multipurpose</h4>
                <p className="pt-3 text-muted">
                  Even the all-powerful Pointing has no control about the blind
                  texts it is an almost unorthographic.
                </p>
              </div>
            </div>
            <div className="mt-3 col-lg-4">
              <div className="services-box text-center hover-effect">
                <i className="pe-7s-plane text-primary" />
                <h4 className="pt-3">Easy to customize</h4>
                <p className="pt-3 text-muted">
                  Question Marks and devious Semikoli, but the Little Blind Text
                  didn’t listen. She packed her seven versalia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="interviewlotteanimaiton features" className="section bg-light iphoneSection" >
        <div className="container">
          <div className="vertical-content row">
            <div className="col-lg-5">
              <div className="features-box">
                <h3>
                  A digital web design studio creating modern &amp; engaging
                  online experiences
                </h3>
                <p className="text-muted web-desc">
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean. A small river named
                  Duden flows by their place and supplies it with the necessary
                  regelialia.
                </p>
                <ul className="text-muted list-unstyled mt-4 features-item-list">
                  <li className="">We put a lot of effort in design.</li>
                  <li className="">
                    The most important ingredient of successful website.
                  </li>
                  <li className="">
                    Sed ut perspiciatis unde omnis iste natus error sit.
                  </li>
                  <li className="">Submit Your Organization.</li>
                </ul>
                <a
                  className="btn btn-primary mt-4 waves-effect waves-light"
                  href="/home-two"
                >
                  Learn More{" "}
                  <FontAwesomeIcon icon="fa-solid fa-arrow-right" fa-2xs />
                  {/* <i className="mdi mdi-arrow-right" /> */}
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
              <h2 className="text-white">Build your dream website today</h2>
              <p className="pt-3 home-desc">
                But nothing the copy said could convince her and so it didn’t
                take long until a few insidious Copy Writers ambushed her.
              </p>
              <a
                className="btn btn-white mt-4 waves-effect waves-light mb-5"
                href="/home-two"
              >
                View Plan &amp; Pricing
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
                The Big Oxmox advised her not to do so, because there were
                thousands of bad Commas, wild Question Marks and devious
                pulvinar metus molestie sed Semikoli.
              </p>
            </div>
          </div>
          <div className="mt-5 row">
            <div className="col-lg-4">
              <div className="testimonial-box hover-effect mt-4">
                <img
                  src="http://dorsin.react.themesbrand.com/assets/images/testimonials/user-2.jpg"
                  alt="client"
                  className="img-fluid d-block img-thumbnail rounded-circle"
                />
                <div className="testimonial-decs">
                  <p className="text-muted text-center mb-0">
                    “I feel confident imposing change on myself. It's a lot more
                    fun progressing than looking back. That's why scelerisque
                    pretium dolor, sit amet vehicula erat pelleque need throw
                    curve balls.”{" "}
                  </p>
                </div>
                <h5 className="text-center text-uppercase pt-3">
                  RUBEN REED -{" "}
                  <span className="text-muted text-capitalize">Charleston</span>
                </h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-box hover-effect mt-4">
                <img
                  src="http://dorsin.react.themesbrand.com/assets/images/testimonials/user-1.jpg"
                  alt="client"
                  className="img-fluid d-block img-thumbnail rounded-circle"
                />
                <div className="testimonial-decs">
                  <p className="text-muted text-center mb-0">
                    “Our task must be to free ourselves by widening our circle
                    of compassion to embrace all living creatures Integer varius
                    lacus non magna tempor congue natuasre the whole its
                    beauty.”{" "}
                  </p>
                </div>
                <h5 className="text-center text-uppercase pt-3">
                  MICHAEL P. HOWLETT -{" "}
                  <span className="text-muted text-capitalize">Worcester</span>
                </h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-box hover-effect mt-4">
                <img
                  src="http://dorsin.react.themesbrand.com/assets/images/testimonials/user-3.jpg"
                  alt="client"
                  className="img-fluid d-block img-thumbnail rounded-circle"
                />
                <div className="testimonial-decs">
                  <p className="text-muted text-center mb-0">
                    “I've learned that people will forget what you said, people
                    will forget what you did, but people will never aliquam in
                    nunc quis tincidunt forget how you vestibulum egestas them
                    feel.”{" "}
                  </p>
                </div>
                <h5 className="text-center text-uppercase pt-3">
                  THERESA D. SINCLAIR -{" "}
                  <span className="text-muted text-capitalize">Lynchburg</span>
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
              <h1 className="section-title text-center">WORK PROCESS</h1>
              <div className="section-title-border mt-3" />
              <p className="section-subtitle text-muted text-center pt-4 font-secondary">
                In an ideal world this website wouldn’t exist, a client would
                acknowledge the importance of having web copy before the Proin
                vitae ipsum vel ex finibus semper design starts.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="text-center process-left-icon-1 col-lg-6">
              <i className="pe-7s-angle-right" />
            </div>
            <div className="text-center process-left-icon-2 col-lg-6">
              <i className="pe-7s-angle-right" />
            </div>
          </div>
          <div className="mt-5 row">
            <div className="plan-line col-lg-4">
              <div className="text-center process-box">
                <i className="pe-7s-pen text-primary" />
                <h4 className="pt-3">Tell us what you need</h4>
                <p className="text-muted">
                  The Big Oxmox advised her not to do so.
                </p>
              </div>
            </div>
            <div className="plan-line col-lg-4">
              <div className="text-center process-box">
                <i className="pe-7s-id text-primary" />
                <h4 className="pt-3">Get free quotes</h4>
                <p className="text-muted">Little Blind Text didn’t listen.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center process-box">
                <i className="pe-7s-target text-primary" />
                <h4 className="pt-3">Deliver high quality product</h4>
                <p className="text-muted">When she reached the first hills.</p>
              </div>
            </div>
            <div className="text-center mx-auto">
              <a
                className="btn btn-primary waves-light waves-effect mt-5"
                href="/home-two"
              >
                Get Started <i className="mdi mdi-arrow-right" />
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
                Let's Get Started
              </h1>
              <div className="section-title-border mt-4 bg-white" />
              <p className="section-subtitle font-secondary text-white text-center pt-4">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.{" "}
              </p>
              <a
                className="btn btn-white waves-effect mt-3 mb-4"
                href="/home-two"
              >
                Get Started <i className="mdi mdi-arrow-right" />{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="bg-pattern-effect">
          <img src={bgPatternLight} alt="pattern" />
        </div>
      </section>
      <section id="ourteam" className="mb-5 mt-3 text-center container">
        <div className="row">
          <h1>Our Team</h1>
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
              <p>I am everything</p>
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
    </div>
  );
}
