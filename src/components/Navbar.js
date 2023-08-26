import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./NavBar.css";
export default function NavBar() {
  const auth = getAuth();
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
  let dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  // spread operater
  let { user } = useSelector((state) => ({ ...state }));

  const logout = async () => {
    try {
      await auth.signOut(); 
console.log("location: ", location);
      dispatch({
        type: "LOGIN_REDIRECT",
        payload: location,
      }); 
      
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      
      const location = "/login";

      toast.warning(`Logout successful`);
      navigate(location);
    } catch (error) {
      console.error("Logout error:", error);
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
                <a className="nav-link js-scroll-trigger" href={`/`}>
                  HOME
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href={`/aboutus`}>
                  ABOUT US
                </a>
              </li> */}
              {!user ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href={`/login`}>
                      LOGIN
                    </a>
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
                          <a onClick={logout} className="nav-link" href={`/login`}>
                            Logout
                          </a>
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