import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const API = "https://vercel-backend-q3tv.onrender.com";

const LoginSignup = () => {

  const [state, setState] = useState("Login")
  const [fromData, setfromData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setfromData({ ...fromData, [e.target.name]: e.target.value })

  }

  const login = async () => {
  try {
    // const response = await fetch("http://localhost:4000/login"
    // const response =await fetch("https://vercel-backend-q3tv.onrender.com/login"

    fetch(`${API}/login`
      , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromData),
    });

    const data = await response.json();

    console.log("LOGIN RESPONSE:", data);

    if (data.success && data.token) {
      localStorage.setItem("auth-token", data.token);

      console.log("TOKEN SAVED:", data.token);

      // 🔥 delay add karo
      setTimeout(() => {
        window.location.replace("/");
      }, 500);

    } else {
      alert("Login Failed");
    }

  } catch (error) {
    console.log("Login Error:", error);
  }
};

  // const signup = async () => {
  //   console.log("Sign Function Executed", fromData);

  //   let responseData;

  //   await fetch('http://localhost:4000/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(fromData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => (responseData = data));

  //   if (responseData.success) {
  //     localStorage.setItem('auth-token', responseData.token);
  //     window.location.replace("/");
  //   } else {
  //     alert(responseData.message);
  //   }
  // };

  const signup = async () => {
    console.log("Signup Function Executed", fromData);

    try {
      // const response = await fetch("http://localhost:4000/signup"
    // const response =await fetch("https://vercel-backend-q3tv.onrender.com/signup"
    fetch(`${API}/signup`
        , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fromData),
      });

      const data = await response.json();

      console.log("SIGNUP RESPONSE:", data);

      if (data.success) {
        localStorage.setItem("auth-token", data.token);

        alert("Signup Successful");

        window.location.replace("/");
      } else {
        alert(data.message || "Signup Failed");
      }

    } catch (error) {
      console.log("Signup Error:", error);
    }
  };
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">

        <h1>{state}</h1>

        <div className="loginsignup-fields">

          {state === "Sign Up" && (<input name='username' value={fromData.username} onChange={changeHandler} type="text" placeholder='Your Name' />)}

          {/* <input type="email" value={fromData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="password" value={fromData.password} onChange={changeHandler} placeholder='Password' /> */}

          <input
            type="email"
            name="email"
            value={fromData.email}
            onChange={changeHandler}
            placeholder="Email Address"
          />

          <input
            type="password"
            name="password"
            value={fromData.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </div>

        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

        {state === "Sign Up"
          ? <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => setState("Login")}> login here</span>
          </p>
          : <p className="loginsignup-login">
            Create an account?
            <span onClick={() => setState("Sign Up")}> Click here</span>
          </p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

      </div>
    </div>
  )
}

export default LoginSignup