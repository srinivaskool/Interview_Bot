import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./NavBar.css";

export default function NewNavBar() {
  const auth = getAuth();
  let dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();

  let { user } = useSelector((state) => ({ ...state }));
  const logout = async () => {
    try {
      await auth.signOut();
      dispatch({
        type: "LOGIN_REDIRECT",
        payload: location.pathname,
      });

      dispatch({
        type: "LOGOUT",
        payload: null,
      });

      const nextLocation = "/login";

      toast.warning(`Logout successful`);
      navigate(nextLocation);
    } catch (error) {
      toast.error("Logout error:", error);
    }
  };
  return (
    <div>
      {" "}
      <nav className="tyn-appbar">
        <div className="tyn-appbar-wrap">
          <div className="tyn-appbar-logo">
            <Link className="tyn-logo" to="/">
              <svg
                viewBox="0 0 43 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.2654 14.793C37.2654 14.793 45.0771 20.3653 41.9525 29.5311C41.9525 29.5311 41.3796 31.1976 39.0361 34.4264L42.4732 37.9677C42.4732 37.9677 43.3065 39.478 41.5879 39.9987H24.9229C24.9229 39.9987 19.611 40.155 14.8198 36.9782C14.8198 36.9782 12.1638 35.2076 9.76825 31.9787L18.6215 32.0308C18.6215 32.0308 24.298 31.9787 29.7662 28.3333C35.2344 24.6878 37.4217 18.6988 37.2654 14.793Z"
                  fill="#60A5FA"
                />
                <path
                  d="M34.5053 12.814C32.2659 1.04441 19.3506 0.0549276 19.3506 0.0549276C8.31004 -0.674164 3.31055 6.09597 3.31055 6.09597C-4.24076 15.2617 3.6751 23.6983 3.6751 23.6983C3.6751 23.6983 2.99808 24.6357 0.862884 26.5105C-1.27231 28.3854 1.22743 29.3748 1.22743 29.3748H17.3404C23.4543 28.7499 25.9124 27.3959 25.9124 27.3959C36.328 22.0318 34.5053 12.814 34.5053 12.814ZM19.9963 18.7301H9.16412C8.41419 18.7301 7.81009 18.126 7.81009 17.3761C7.81009 16.6261 8.41419 16.022 9.16412 16.022H19.9963C20.7463 16.022 21.3504 16.6261 21.3504 17.3761C21.3504 18.126 20.7358 18.7301 19.9963 18.7301ZM25.3708 13.314H9.12245C8.37253 13.314 7.76843 12.7099 7.76843 11.96C7.76843 11.21 8.37253 10.6059 9.12245 10.6059H25.3708C26.1207 10.6059 26.7248 11.21 26.7248 11.96C26.7248 12.7099 26.1103 13.314 25.3708 13.314Z"
                  fill="#2563EB"
                />
              </svg>
            </Link>
          </div>
          {/* tyn-logo */}
          <div className="tyn-appbar-content">
            <ul className="tyn-appbar-nav tyn-appbar-nav-start">
              <li className="tyn-appbar-item d-none d-sm-inline-flex">
                <Link className="tyn-appbar-link" to="/interview">
                  {/* robot */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-robot"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                    <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
                  </svg>
                  <span className="d-none">ChatBot</span>
                </Link>
              </li>
            </ul>
            {/* .tyn-appbar-nav */}
            <ul className="tyn-appbar-nav tyn-appbar-nav-end">
              <li className="tyn-appbar-item nav-item dropdown">
                <Link
                  className="d-inline-flex nav-link "
                  data-toggle="dropdown"
                  data-bs-offset="0,10"
                >
                  <div className="tyn-media tyn-size-lg tyn-circle">
                    <img
                      style={{ opacity: `${user ? "1" : "0.7"}` }}
                      src={
                        user
                          ?  user.profilepic
                          : "https://png.pngtree.com/element_our/sm/20180516/sm_5afc60f232478.png"
                      }
                      alt=""
                    />
                  </div>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  {user ? (
                    <>
                      {" "}
                      <div className="dropdown-gap">
                        <div className="tyn-media-group">
                          <div className="tyn-media tyn-size-lg">
                            <img
                              src= {user.profilepic}
                              alt=""
                            />
                          </div>
                          <div className="tyn-media-col">
                            <div className="tyn-media-row">
                              <h6 className="name">
                                {" "}
                                {user.email.split("@")[0]}
                              </h6>
                            </div>
                            <div className="tyn-media-row has-dot-sap">
                              <p className="content">{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="tyn-list-links">
                        <li>
                          <Link to="/profile">
                            {/* person */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-person"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/settings">
                            {/* gear */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-gear"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                            <span>Settings</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/forgot/password">
                            {/* unlock */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-unlock"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                            </svg>
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li className="dropdown-divider" />
                        <li>
                          <Link
                            onClick={logout}
                            className="nav-link"
                            to={`/login`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-power"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.5 1v7h1V1h-1z" />
                              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                            </svg>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <ul className="tyn-list-links">
                      <li>
                        <Link to="/register">
                          {/* unlock */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-unlock"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                          </svg>
                          <span>Register</span>
                        </Link>
                      </li>
                      <li className="dropdown-divider" />
                      <li>
                        <Link className="nav-link" to={`/login`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-power"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.5 1v7h1V1h-1z" />
                            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                          </svg>
                          <span>Login</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                  {/* .tyn-list-links */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
