"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, Select, SelectItem } from "@nextui-org/react";

import { showNotification, useField } from "@/lib";
import {
  FormField,
  Header,
  PasswordField,
  SubmitBtn,
} from "@/components/reuseables";
import { PasswordLengthSchema } from "@/schema";

export default function LoginForm() {
  const callbackUrl = useSearchParams().get("callbackUrl");

  const [id, setId] = useState<string>("");
  const [loginAs, setLoginAs] = useState<string>("student");

  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
  } = useField("", PasswordLengthSchema);

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !id) {
      setIsSubmiting(false);

      return;
    }

    setIsSubmiting(true);

    const res = await signIn("credentials", {
      id,
      password,
      loginAs,
      redirect: false,
    });

    if (res?.ok) {
      showNotification("success", "top-right", undefined, {
        message: "Login Successfull",
      });

      setIsDisabled(true);
      router.replace(callbackUrl || "/dashboard");
    }

    if (!res?.ok) {
      showNotification("error", "top-right", undefined, {
        message:
          res?.error?.replace("Error: ", "") ||
          "An error occurred. Please try again later.",
      });
    }

    setIsSubmiting(false);

    return;
  };

  useEffect(() => {
    setIsDisabled(!id || !password || !loginAs);
  }, [id, password, loginAs]);

  return (
    <Card
      className="bg-transparent dark:text-white flex flex-col gap-4 max-w-[450px] w-full mx-auto"
      radius="none"
      shadow="none"
    >
      <Header
        elseGoTo={{
          link: "/auth/signup",
          info: "Don't have a atudent account?",
          text: "Create",
        }}
        title="Login"
      />
      <div className="log-group flex flex-col gap-6">
        <form className="login" id="login" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 font-hind">
            <div className="flex flex-col w-full gap-4">
              <Select
                className="rounded-none w-full data-[hover=true]:border-idLink data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary user-select-none"
                classNames={{
                  label: "text-small",
                }}
                label="Login As"
                labelPlacement="outside"
                placeholder="Select login type"
                radius="none"
                size="lg"
                variant="bordered"
                onChange={(e) => setLoginAs(e.target.value)}
              >
                <SelectItem key="student" value="student">
                  Student
                </SelectItem>
                <SelectItem key="institution" value="institution">
                  Institution Staff
                </SelectItem>
                <SelectItem key="nysc" value="nysc">
                  NYSC staff
                </SelectItem>
              </Select>
              <FormField
                errorMessage={"Input your email"}
                htmlFor="id"
                id="id"
                isInvalid={!id}
                label="Email"
                placeholder="Enter your email"
                radius="none"
                size="lg"
                type="email"
                variant="bordered"
                onChange={(e) => setId(e)}
              />

              <PasswordField
                PasswordText={"Password"}
                errorMessage={passwordError || ""}
                handlePasswordChange={handlePasswordChange}
                isInvalid={!!passwordError}
                passwordError={passwordError}
                placheolderText={"*******"}
                radius="none"
                size="lg"
                value={password}
              />
            </div>
            <div className="flex flex-col gap-2">
              <SubmitBtn isDisabled={isDisabled} isLoading={isSubmiting}>
                Login
              </SubmitBtn>
            </div>
            {/* <div className="flex w-full justify-center">
              <div className="don flex gap-2 items-center font-hind">
                <span>Forgot Password?</span>
                <Link
                  className="text-primary hover:bg-transparent font-medium hover:text-primary-800 underline"
                  href="#recover"
                >
                  Recover
                </Link>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </Card>
  );
}
