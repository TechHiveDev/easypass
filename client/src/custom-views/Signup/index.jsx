import React, { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";
import Button from "@mui/material/Button";

export default function SignUp() {
  const [login, setLogin] = useState(true);
  return (
    <>
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
          <>
            <SignInForm />
            <div>
              don't have an account ?
              <Button
                onClick={() => {
                  setLogin(false);
                }}
              >
                Sign up
              </Button>
            </div>
          </>
        ) : (
          <>
            <SignUpForm />
            <div>
              already have an account ?
              <Button
                onClick={() => {
                  setLogin(true);
                }}
              >
                login
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
