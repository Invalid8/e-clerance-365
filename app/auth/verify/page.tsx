"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showNotification } from "@/lib";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const VerifyPage = () => {
  const search = useSearchParams();

  const router = useRouter();
  const token = search.get("token");

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) {
        router.replace("/");
        return;
      }

      setLoading(true);

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

      setLoading(false);
    };

    verifyAccount();
  }, [token, router]);

  return (
    <div className="grid place-content-center w-full h-svh">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div>
          <h1>Email Verification</h1>
          {message ? <p>{message}</p> : <p>Verifying...</p>}
        </div>
        <Button
          color="primary"
          radius="sm"
          as={Link}
          href="/"
          disabled={loading}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default VerifyPage;
