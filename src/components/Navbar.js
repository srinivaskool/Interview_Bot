import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./NavBar.css";
export default function NavBar() {
  const auth = getAuth();
  let dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  const [navstate, setnavstate] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);
  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setnavstate(true);
    } else {
      setnavstate(false);
    }
  };
  // spread operater
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
      <nav
        className={
          !navstate
            ? "navbar navbar-expand-lg navbar-dark fixed-top"
            : "navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink"
        }
        id="mainNav"
      >
        <div className="container">
          <a
            className="navbar-brand js-scroll-trigger center column nav-title"
            href={`/`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png"
              alt="giftshublogo"
              className="giftshublogoimg"
            />
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars ml-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item active">
                <Link className="nav-link js-scroll-trigger" to={`/`}>
                  HOME
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to={`/aboutus`}>
                  ABOUT US
                </Link>
              </li> */}
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link js-scroll-trigger" to={`/login`}>
                      LOGIN
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  {/* <li className="nav-item">
                    <a
                      className="nav-link js-scroll-trigger"
                      href={`/userpackspage`}
                    >
                      MY PACKS
                    </a>
                  </li> */}
                  <li className="nav-item avatar dropdown">
                    <a
                      className="nav-link dropdown-toggle p-0"
                      id="navbarDropdownMenuLink-5"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user.email.split("@")[0]}
                      {user.profilepic ? (
                        <img
                          width="40"
                          src={user.profilepic}
                          className="md-avatar rounded-circle ml-3"
                          alt="avatar image"
                        />
                      ) : (
                        <img
                          width="40"
                          src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
                          className="md-avatar rounded-circle ml-3"
                          alt="avatar image"
                        />
                      )}{" "}
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right dropdown-secondary"
                      aria-labelledby="navbarDropdownMenuLink-5"
                    >
                      <li className="nav-item ">
                        {user && (
                          <Link
                            onClick={logout}
                            className="nav-link"
                            to={`/login`}
                          >
                            Logout
                          </Link>
                        )}
                      </li>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
