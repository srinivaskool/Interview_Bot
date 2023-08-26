import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MailOutlineOutlined } from "@mui/icons-material";
import Button1 from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import {
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../../components/NavBar";
// import Footer from "../../Footers/Footer";
import { auth } from "../../firebase";
import "./Login.css";
const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
    borderRadius: 25,
    width: 300,
  },
}));
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [ReEmail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const provider = new GoogleAuthProvider();
  const { user } = useSelector((state) => ({ ...state }));
  const { redirectPage } = useSelector((state) => ({ ...state }));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    console.log(
      process.env.REACT_APP_REGISTER_REDIRECT_URL,
      "handle register submit"
    );

    await sendSignInLinkToEmail(auth, ReEmail, config);

    toast.success(
      `Email is sent to ${ReEmail}.Click the link to complete your registration.`
    );
    //save email in local storage
    window.localStorage.setItem("emailForRegistration", ReEmail);
    console.log();
    // clear state
    setReEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleRegisterSubmit}>
      <input
        type="email"
        className="form-control"
        value={ReEmail}
        onChange={(e) => setReEmail(e.target.value)}
        placeholder="Your Email"
        autoFocus
      />
      <br />

      <Button1
        variant="contained"
        color="secondary"
        onClick={handleRegisterSubmit}
        startIcon={<MailOutlineOutlined />}
        className={classes.button}
      >
        Register
      </Button1>
    </form>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
          uid: user.uid,
        },
      });
      setLoading(true); // waste to write
      navigate(redirectPage);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      const user = result.user;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
          uid: user.uid,
        },
      });

      navigate(redirectPage);
      toast.success(`Login successfull`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password "
        />
      </div>
      <Link
        to="/forgot/password"
        className="float-right text-danger logintxtdngr"
      >
        Forgot Password ?
      </Link>
      <Button1
        variant="contained"
        color="secondary"
        disabled={!email || !password}
        onClick={handleSubmit}
        startIcon={<MailOutlineOutlined />}
        className={classes.button}
      >
        Login with Email & Password
      </Button1>
    </form>
  );

  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <div className="container p-3">
        <div className="row">
          <div className=" mx-auto loginrow">
            <div className="row">
              <div className="col-md-6 ">
                {loading ? (
                  <h4 className="text-danger "> Loading.. </h4>
                ) : (
                  <h4 className="loginh4">Login</h4>
                )}
                {loginForm()}

                <center>
                  <h3 style={{ fontSize: "17px" }}>OR</h3>
                </center>
                <Button1
                  variant="contained"
                  color="secondary"
                  onClick={handleGoogleLogin}
                  startIcon={<FontAwesomeIcon icon={faGoogle} />}
                  className={classes.button}
                >
                  Login with Google
                </Button1>
              </div>
              <div className="col-md-6 ">
                <h4 className="loginh4">Register</h4>
                {registerForm()}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
