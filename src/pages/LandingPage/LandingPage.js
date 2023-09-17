import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import landingBackgroundImage from "../../Images/mainBackground.jpg";
import MainNavBar from "../../components/MainNavBar";
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function updateRedirectRedux(destination) {
    console.log("DWaraka redirecting: ", destination);
    dispatch({
      type: "LOGIN_REDIRECT",
      payload: destination,
    });
    navigate(destination);
  }
  return (
    <div className="landingPage tyn-root">
      <MainNavBar />
      <main style={{ backgroundImage: `url(${landingBackgroundImage})` }}>
        <div className="overlayStyle"></div>
        <div className="jumbotron mb-0">
          <div className="tyn-content tyn-content-page">
            <div className="tyn-main">
              <div className="tyn-section tyn-section-lg pb-0">
                <div className="container">
                  <div className="tyn-section-head tyn-text-block text-center">
                    <h2
                      className="h1"
                      style={{ color: "rgb(65, 77, 94)", fontWeight: "600" }}
                    >
                      Ace the interview. Get the job
                    </h2>
                    <p style={{ color: "rgb(75, 83, 93)" }}>
                      Unlock Your Software Engineering Journey
                    </p>
                  </div>
                  <div className="tyn-section-content">
                    <div className="row g-4 justify-content-center">
                      <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="card h-100 border-0">
                          <div className="card-body p-4">
                            <div className="text-muted text-opacity-50 fs-7 mt-n2 fw-medium">
                              General Intro and Skill Testing:
                            </div>
                            <div className="tyn-media tyn-circle mb-3 d-sm-none d-lg-inline-flex">
                              <div class="form-control-icon start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 576 512"
                                >
                                  <path d="M528 160V416c0 8.8-7.2 16-16 16H320c0-44.2-35.8-80-80-80H176c-44.2 0-80 35.8-80 80H64c-8.8 0-16-7.2-16-16V160H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM272 256a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm104-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0-24-10.7-24-24s10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0-24-10.7-24-24s10.7-24-24-24H376z" />
                                </svg>
                              </div>
                            </div>
                            <h5 className="pb-2 pt-1 landing-card-subheading">
                              Intro Journey
                            </h5>
                            <ul className="list-check fs-6 d-flex flex-column gap gap-2">
                              <li className="d-flex gap gap-2">
                                <span className="text-success">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-check"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                  </svg>
                                </span>
                                <span>Introductory Round</span>
                              </li>
                              <li className="d-flex gap gap-2">
                                <span className="text-success">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-check"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                  </svg>
                                </span>
                                <span>Skills Assessment</span>
                              </li>
                              <li className="d-flex gap gap-2">
                                <span className="text-success">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-check"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                  </svg>
                                </span>
                                <span>Broad Skill Testing</span>
                              </li>
                            </ul>
                            <div className="mt-4">
                              <h3
                                className="btn btn-secondary"
                                onClick={() =>
                                  updateRedirectRedux("/interview/intro")
                                }
                              >
                                Get Started
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="card h-100 border-0">
                          <div className="card-body p-4">
                            <div className="text-primary fs-7 mt-n2 fw-medium">
                              Resume Review Round:
                            </div>
                            <div className="tyn-media tyn-circle mb-3 d-sm-none d-lg-inline-flex">
                              <div class="form-control-icon start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M64 464H96v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V288H336V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z" />
                                </svg>
                              </div>
                            </div>
                            <h5 className="pb-2 pt-1 landing-card-subheading">
                              Resume Focus
                            </h5>
                            <ul className="list-check fs-6 d-flex flex-column gap gap-2">
                              <li className="d-flex gap gap-2">
                                <span className="text-success">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-check"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                  </svg>
                                </span>
                                <span>Resume Assessment</span>
                              </li>
                              <li className="d-flex gap gap-2">
                                <span className="text-success">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-check"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                  </svg>
                                </span>
                                <span>Profile Evaluation</span>
                              </li>
                              <li className="d-flex gap gap-2">
                                <span className="text-success">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-check"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                  </svg>
                                </span>
                                <span>Tailored Questions</span>
                              </li>
                            </ul>
                            <div className="mt-4">
                              <h3
                                className="btn btn-primary"
                                onClick={() =>
                                  updateRedirectRedux("/interview/resume")
                                }
                              >
                                Let's Begin
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4">
                        <div className="card h-100 border-0">
                          <div className="card-body p-4">
                            <div className="text-success fs-7 mt-n2 fw-medium">
                              DSA and Coding Round:
                            </div>
                            <div className="row align-items-center">
                              <div className="col-sm-6 col-lg-12">
                                <div className="tyn-media tyn-circle mb-3 d-sm-none d-lg-inline-flex">
                                  <div class="form-control-icon start">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="1em"
                                      viewBox="0 0 640 512"
                                    >
                                      <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                                    </svg>
                                  </div>
                                </div>
                                <h5 className="pb-2 pt-1 landing-card-subheading">
                                  Coding Skills
                                </h5>
                                <ul className="list-check fs-6 d-flex flex-column gap gap-2">
                                  <li className="d-flex gap gap-2">
                                    <span className="text-success">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-check"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                      </svg>
                                    </span>
                                    <span>Coding Challenges</span>
                                  </li>
                                  <li className="d-flex gap gap-2">
                                    <span className="text-success">
                                      {/* check */}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-check"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                      </svg>
                                    </span>
                                    <span>DSA Assessment</span>
                                  </li>
                                  <li className="d-flex gap gap-2">
                                    <span className="text-success">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-check"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                      </svg>
                                    </span>
                                    <span>Algorithmic Skills</span>
                                  </li>
                                </ul>
                                <div className="mt-4 d-sm-none d-lg-flex">
                                  <h3
                                    className="btn btn-success"
                                    onClick={() =>
                                      updateRedirectRedux(
                                        "/interview/dsaaround"
                                      )
                                    }
                                  >
                                    Go For It
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
