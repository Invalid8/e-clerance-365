"use client";

import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { CountdownTimer } from "nextjs-countdown-timer";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Card, CardFooter } from "@nextui-org/react";

import { handleForgotPassword, handleVerification } from "../handle";

import { destroyToken, getToken } from "@/lib";
import { cn, showNotification } from "@/lib";
import { FixedBottomButton, Header } from "@/components/reuseables";

const Verify = () => {
  const pathname = usePathname();

  const router = useRouter();
  const counts = 30;
  const [countdown, setCountdown] = useState(counts);

  const [otp, setOtp] = useState("");

  const [showResend, setShowResend] = useState(false);

  const [isLoad, setIsLoad] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    async function getEmail() {
      let email = await getToken("email");

      if (!email) {
        router.replace("/auth/login#recover");
      } else {
        setEmail(email);
      }
    }

    getEmail();
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const counter = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearInterval(counter);
    }
  }, [countdown]);

  const handleSubmit = async () => {
    setIsLoad(true);

    showNotification("warn", "top-right", undefined, {
      message: "Verifying your account 👌",
    });

    const verify_for = await getToken("verify_for");
    const { message, success, data } = await handleVerification(
      otp,
      email,
      verify_for
    );

    if (success) {
      if (pathname === "/auth/signup") {
        const res = await signIn("credentials", {
          userTokenIn: data.token,
          redirect: false,
        });

        if (res?.ok) {
          showNotification("success", "top-right", undefined, {
            message: "Login Successfull",
          });

          setIsDisabled(true);
          router.replace("/dashboard");
        }
      } else {
        if (verify_for === "password_reset") {
          router.replace("/auth/login#change_password");
        } else {
          router.replace("/auth/login");
        }
      }
    } else {
      showNotification("error", "top-right", undefined, {
        message: message,
      });
    }

    setIsLoad(false);
  };

  const generatePlaceholder = () => {
    const numInputs = 4;

    return "X".repeat(numInputs);
  };

  const handleTimerEnd = () => {
    setTimeout(() => {
      setShowResend(true);
    }, 0);
  };

  const handleResendClick = async () => {
    setShowResend(false);

    if (countdown === 0) {
      const { success, message } = await handleForgotPassword(email);

      if (success) {
        setOtp("");
        setCountdown(counts);
      } else {
        showNotification("error", "top-right", undefined, {
          message: message,
        });

        setShowResend(true);
      }
    }
  };

  useEffect(() => {
    const isOtpValid = otp && otp.length === 4;

    setIsDisabled(!isOtpValid);
  }, [otp]);

  return (
    <Card
      className="bg-transparent dark:text-white flex flex-col gap-4"
      radius="none"
      shadow="none"
    >
      <Header
        center
        elseGoTo={{
          info: `Verification code sent to: ${email}`,
        }}
        title="Verify email address!"
      />

      <div>
        <div className="otp m-auto w-full items-center justify-center pb-6 text-center">
          <OTPInput
            containerStyle="otpbox"
            inputStyle={"border-1 border-[#D9D9D9] dark:bg-dark-1"}
            numInputs={4}
            placeholder={generatePlaceholder()}
            renderInput={(props) => <input {...props} autoComplete="off" />}
            renderSeparator={<span>&nbsp;</span>}
            value={otp}
            onChange={setOtp}
          />
        </div>
        <div className="div">
          <p className={cn("text-muted-foreground text-center")}>
            No code yet?{" "}
            {showResend ? (
              <button className="text-debizOrange" onClick={handleResendClick}>
                Resend OTP
              </button>
            ) : (
              <>
                Resending in{" "}
                <CountdownTimer
                  initialSeconds={60}
                  onTimerEnd={handleTimerEnd}
                />
              </>
            )}
          </p>
        </div>
      </div>
      <CardFooter>
        <FixedBottomButton
          unFix
          btnsubtxt="Go Back"
          btnsubtxtlnk={{
            pathname: pathname,
            function: async () => {
              await destroyToken("email");
              await destroyToken("verify_for");
            },
          }}
          buttonTxt="Verify Account"
          className="bg-primary text-primary-foreground"
          isDisabled={isDisabled}
          isLoad={isLoad}
          onClick={handleSubmit}
        />
      </CardFooter>
    </Card>
  );
};

export default Verify;
