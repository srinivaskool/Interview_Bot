import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Lottie from "react-lottie";
import bgHome1 from "../../Images/bgHome1.png";
import bgPattern from "../../Images/bgPattern.png";
import handsImage from "../../Images/handsImage.png";
import mainPageInterviewAnimation from "../../Images/mainPageInterviewAnimation.json";
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
  return (
    <div className="home_page">
      <MainNavBar />
      <section
        className="section bg-home home-half"
        id="home"
        style={{
          backgroundImage: `url(${bgHome1})`,
          marginTop: "72px",
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
      <section className="section serviceSection" id="services">
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
      <section className="section bg-light iphoneSection" id="features">
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
                  Learn More <FontAwesomeIcon icon="fa-solid fa-arrow-right" fa-2xs />
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
      <section className="section bg-light iphoneSection">
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
    </div>
  );
}
