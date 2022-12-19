import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import login from "./login.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      console.log(auth);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      alert("Bad user credentials");
    }
  }
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <div className={styles.login_image}>
            <img
              src={login}
              width="200"
			  height="150"
              alt="login"
            />
          </div>
          <form className={styles.form_container} onSubmit={onSubmit}>
            {" "}
            <h2>Welcome Back to instaBuzz!</h2>
			<br></br>
            <h3>Login to Your Account to see activities</h3>
            <br></br>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={onChange}
              value={email}
              className={styles.input}
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
              value={password}
              className={styles.input}
            />
            <br></br>
            <Link to="/forgot-password" className="">
              Forgot password?
            </Link>
            <button className="primary__button">
              <span>Login</span>
            </button>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">
                Don't have an account?
              </p>
            </div>
            <button className="primary__button">
              <Link to="/Signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
