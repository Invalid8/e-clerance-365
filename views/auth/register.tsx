"use client";

import { useEffect, useState } from "react";

import { AuthWrapper } from "./layout";
import { RegisterForm, Verify } from "./forms";

import { useHash } from "@/lib";

const Register = () => {
  const hash = useHash();
  const [theHash, setTheHash] = useState<any>(hash);

  const authSwitch = (hash: string): JSX.Element => {
    switch (hash) {
      case "#verify":
        return <Verify />;

      default:
        return <RegisterForm />;
    }
  };

  useEffect(() => {
    setTheHash(hash);
  }, [hash]);

  return <AuthWrapper>{authSwitch(theHash)}</AuthWrapper>;
};

export default Register;
