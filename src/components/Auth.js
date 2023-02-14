import React, { useState } from "react"

export default function Auth (props) {
    const [authMode, setAuthMode] = useState("signin")
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const handleSignUp = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/api/signUp", requestOptions)
        .then(response => response.text())
        .then(result => window.location.href = "/")
        .catch(error => console.log('error', error));
    }

    const handleSignIn = () =>{
        console.log("SignIn")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/api/signIn", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.status === 'Success'){
                window.location.href = "/dashboard"
            }
            else{
                setError(true)
                setMessage(result.message);
            }
        })
        .catch(error => console.log(error));
    }
  
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={handleSignIn}>
                  Submit
                </button>
              </div>
              {error &&
                <div className="d-grid gap-2 mt-3">
                    <label>{message}</label>
                </div>
              }
            </div>
          </form>
        </div>
      )
    }
  
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={handleSignUp}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
