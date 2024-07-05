"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import OTPInput from "react-otp-input";
import { CountdownTimer } from "nextjs-countdown-timer";

import { handleResetPassword, handleForgotPassword } from "../handle";

import { cn, destroyToken, getToken } from "@/lib";
import {
  FixedBottomButton,
  Header,
  PasswordField,
} from "@/components/reuseables";
import { createSchema, showNotification, useField } from "@/lib";

const PasswordLengthSchema = createSchema(
  (value) => value.length >= 8,
  "Password must be at least 8 characters long."
);

// const PasswordAlphanumericSchema = createSchema(
//   (value) => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
//   "Password must contain at least one letter and one number."
// );

const ChangePassword = () => {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [showResend, setShowResend] = useState(false);
  const [otp, setOtp] = useState<string>("");

  const counts = 30;
  const [countdown, setCountdown] = useState(counts);

  const pathname = usePathname();

  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
  } = useField("", PasswordLengthSchema);

  const ConfirmPasswordSchema = PasswordLengthSchema.refine(
    (confirmPassword: string) => confirmPassword === password,
    {
      message: "Passwords do not match",
    }
  );

  const {
    value: confirmPassword,
    error: confirmPasswordError,
    handleChange: handleConfirmPasswordChange,
  } = useField("", ConfirmPasswordSchema);

  const router = useRouter();

  useEffect(() => {
    async function getProps() {
      let email = await getToken("email");

      if (!email) {
        router.replace("#recover");
      } else {
        setEmail(email);
      }
    }

    getProps();
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const counter = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearInterval(counter);
    }
  }, [countdown]);

  const generatePlaceholder = () => {
    const numInputs = 4;

    return "X".repeat(numInputs);
  };

  const handleTimerEnd = () => {
    setTimeout(() => {
      setShowResend(true);
    }, 0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setIsSubmiting(false);

      return;
    }

    if (password != confirmPassword) {
      showNotification("error", "top-right", undefined, {
        message: "Passwords do not match",
      });

      setIsSubmiting(false);

      return;
    }

    setIsSubmiting(true);

    const { message, success } = await handleResetPassword(
      email,
      otp,
      password,
      confirmPassword
    );

    if (success) {
      showNotification("success", "top-right", undefined, {
        message: message,
      });

      await destroyToken("verify_for");
      await destroyToken("email");
      router.replace("/auth/login");
    } else {
      showNotification("error", "top-right", undefined, {
        message: message,
      });
    }

    setIsSubmiting(false);
  };

  useEffect(() => {
    const isOtpValid = otp && otp.length === 4;

    setIsDisabled(!isOtpValid || !password || confirmPassword !== password);
  }, [confirmPassword, password, otp]);

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

  return (
    <Card
      className="bg-transparent dark:text-white flex flex-col gap-4"
      radius="none"
      shadow="none"
    >
      <Header
        elseGoTo={{
          info: `Your new password must be different from previously used passwords.\nVerification code sent to: ${email}.`,
        }}
        title="Create new password!"
      />
      <div className="log-group flex flex-col gap-6 justify-between">
        <form className="verify" id="verify" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 font-hind">
            <div className="otp m-auto w-full items-center justify-center text-center flex flex-col gap-4">
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
              <div className="div">
                <p className={cn("text-muted-foreground text-center")}>
                  No code yet?{" "}
                  {showResend ? (
                    <button
                      className="text-debizOrange"
                      onClick={handleResendClick}
                    >
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
            <div className="flex flex-col gap-4">
              <PasswordField
                PasswordText={"Password"}
                errorMessage={passwordError || ""}
                handlePasswordChange={handlePasswordChange}
                isInvalid={!!passwordError}
                passwordError={passwordError}
                placheolderText={"*******"}
                radius="sm"
                required={true}
                value={password}
              />
              <PasswordField
                PasswordText={"Confirm Password"}
                errorMessage={confirmPasswordError || ""}
                handlePasswordChange={handleConfirmPasswordChange}
                isInvalid={!!confirmPasswordError}
                passwordError={confirmPasswordError}
                placheolderText={"*******"}
                radius="sm"
                required={true}
                value={confirmPassword}
              />
            </div>
            <FixedBottomButton
              unFix
              btnsubtxt="Go Back"
              btnsubtxtlnk={{
                pathname: pathname,
                function: async () => {
                  await destroyToken("email");
                  await destroyToken("verify_for");
                  await destroyToken("otp");
                },
              }}
              buttonTxt="Reset Password"
              className="bg-primary text-primary-foreground w-full"
              isDisabled={isDisabled}
              isLoad={isSubmiting}
              isSubmitBtn={true}
            />
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ChangePassword;
