"use client";

import { useEffect, useState } from "react";

import { AuthWrapper } from "./layout";
import { ChangePassword, LoginForm, Recover, Verify } from "./forms";

import { useHash } from "@/lib";

const Login = () => {
  const hash = useHash();
  const [theHash, setTheHash] = useState<any>(hash);

  const authSwitch = (hash: string): JSX.Element => {
    switch (hash) {
      case "#recover":
        return <Recover />;
      // case "#verify":
      //   return <Verify />;
      case "#change_password":
        return <ChangePassword />;

      default:
        return <LoginForm />;
    }
  };

  useEffect(() => {
    setTheHash(hash);
  }, [hash]);

  return <AuthWrapper>{authSwitch(theHash)}</AuthWrapper>;
};

export default Login;
