import React, { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";

export default function SignUp() {
  const [login, setLogin] = useState(true);
  return (
    <>
      {login ? <SignInForm /> : <SignUpForm />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {login ? (
          <div>
            don't have an account ?
            <button
              onClick={() => {
                setLogin(false);
              }}
            >
              Sign up
            </button>
          </div>
        ) : (
          <div>
            already have an account ?
            <button
              onClick={() => {
                setLogin(true);
              }}
            >
              login
            </button>
          </div>
        )}
      </div>
    </>
  );
}
