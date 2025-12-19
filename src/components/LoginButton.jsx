"use client";

import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button onClick={() => signIn()} className="btn">
      Login Now
    </button>
  );
};

export default LoginButton;
