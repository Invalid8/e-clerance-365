"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { z } from "zod";

import { handleForgotPassword } from "../handle";

import { setToken, showNotification, useField } from "@/lib";
import { FormField, Header, SubmitBtn } from "@/components/reuseables";

const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

const Recover = () => {
  const {
    value: email,
    error: emailError,
    handleChange: handleEmailChange,
  } = useField("", EmailSchema);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setIsSubmiting(false);

      return;
    }

    setIsSubmiting(true);

    const { message, success } = await handleForgotPassword(email);

    if (success) {
      showNotification("success", "top-right", undefined, {
        message: message,
      });
      await setToken("password_reset", "verify_for");
      router.replace(`/auth/login#change_password`);
    } else {
      showNotification("error", "top-right", undefined, {
        message: message,
      });
    }

    setIsSubmiting(false);
  };

  useEffect(() => {
    if (!!email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  return (
    <Card
      className="bg-transparent dark:text-white flex flex-col gap-4 max-w-[450px] w-full mx-auto"
      radius="none"
      shadow="none"
    >
      <Header
        elseGoTo={{
          info: `Enter the email associated with your account and we'll send a code to reset your password.`,
        }}
        title="Forgot your Password?"
      />

      <form
        className="recover flex flex-col gap-4"
        id="login"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6 font-hind">
          <FormField
            required
            errorMessage={emailError || ""}
            htmlFor="email"
            id="email"
            isInvalid={!!emailError}
            label="Email Address"
            placeholder="Enter your email address"
            radius="sm"
            type="email"
            variant="bordered"
            onChange={handleEmailChange}
          />
        </div>
        <CardFooter className="flex gap-2 p-0">
          <SubmitBtn isDisabled={isDisabled} isLoading={isSubmiting}>
            Next
          </SubmitBtn>
          <Button
            className="text-primary p-4 py-6 font-medium text-lg w-full"
            variant="light"
            onPress={() => {
              router.push("/auth/login");
            }}
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Recover;
