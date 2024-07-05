"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { showNotification } from "@/lib";
import { signIn } from "next-auth/react";

const VerifyPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) return;

      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);

          const res = await signIn("credentials", {
            userTokenIn: data.token,
            redirect: false,
          });

          if (res?.ok) {
            showNotification("success", "top-right", undefined, {
              message: "Login Successfull",
            });

            router.replace("/dashboard");
          }
        } else {
          setMessage(data.message || "Account Verification failed");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
      }
    };

    verifyAccount();
  }, [token, router]);

  return (
    <div>
      <h1>Email Verification</h1>
      {message ? <p>{message}</p> : <p>Verifying...</p>}
    </div>
  );
};

export default VerifyPage;
