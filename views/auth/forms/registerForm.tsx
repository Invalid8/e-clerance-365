"use client";

import "react-international-phone/style.css";
import {
  Card,
  CardFooter,
  Select,
  SelectItem,
  DatePicker,
  CardBody,
} from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";

import { handleSignUp } from "../handle";

import {
  FormField,
  Header,
  PasswordField,
  SubmitBtn,
} from "@/components/reuseables";
import { cn, showNotification, useField } from "@/lib";
import { siteConfig } from "@/config/site";
import {
  EmailSchema,
  FullNameSchema,
  PasswordLengthSchema,
  PhoneSchema,
  normSchema,
} from "@/schema";
import { Label } from "@/components/ui/label";

const RegisterForm: React.FC = () => {
  const {
    value: name,
    error: nameError,
    handleChange: handleNameChange,
  } = useField("", FullNameSchema);

  const {
    value: email,
    error: emailError,
    handleChange: handleEmailChange,
  } = useField("", EmailSchema);

  const {
    value: faculty,
    error: facultyError,
    handleChange: handleFacultyChange,
  } = useField("", normSchema);

  const {
    value: department,
    error: departmentError,
    handleChange: handleDepartmentChange,
  } = useField("", normSchema);

  const [gender, setGender] = useState<string>("");
  const [DOB, setDOB] = useState<any>(undefined);
  const [sessionIn, setSessionIn] = useState<any>(undefined);
  const [sessionOut, setSessionOut] = useState<any>(undefined);

  const {
    value: phone,
    handleChange: handlePhoneChange,
    error: phoneError,
  } = useField("", PhoneSchema);

  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
  } = useField("", PasswordLengthSchema);

  const ConfirmPasswordSchema = PasswordLengthSchema.refine(
    (confirmPassword) => confirmPassword === password,
    {
      message: "Passwords do not match",
    }
  );

  const {
    value: confirmPassword,
    error: confirmPasswordError,
    handleChange: handleConfirmPasswordChange,
  } = useField("", ConfirmPasswordSchema);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    showNotification("warn", "top-right", undefined, {
      message: "Creating your account...🚀",
    });

    setIsLoading(true);

    const body = {
      firstname: name.split(" ")[0],
      lastname: name.split(" ")[1],
      email: email,
      telephone: phone,
      gender: gender,
      department: department,
      faculty: faculty,
      DOB: DOB.toString(),
      password: password,
      sessionIn: sessionIn.toString(),
      sessionOut: sessionOut.toString(),
    };

    const { message, success } = await handleSignUp(body);

    if (success) {
      showNotification("success", "top-right", undefined, {
        message: "Sign Up Successfull ✨",
      });
      setMessage(message);
    } else {
      showNotification("error", "top-right", undefined, {
        message: message || "An error occurred. Please try again later.",
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setIsDisabled(
      !name ||
        !email ||
        !password ||
        !confirmPassword ||
        password !== confirmPassword ||
        !phone ||
        !gender ||
        !DOB ||
        !faculty ||
        !department ||
        !sessionIn ||
        !sessionOut
    );
  }, [
    name,
    email,
    password,
    confirmPassword,
    phone,
    gender,
    DOB,
    faculty,
    department,
    sessionIn,
    sessionOut,
  ]);

  return (
    <>
      {!message && (
        <Card
          className="bg-transparent dark:text-white flex flex-col gap-4"
          radius="none"
          shadow="none"
        >
          <Header
            elseGoTo={{
              link: "/auth/login",
              info: "Already have an account?",
              text: "Login",
            }}
            title="Register Student Account"
          />
          <form className="register" id="register" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <p className="text-xs italic">
                <span className="text-destructive">*</span> All fields are
                required.
              </p>
              <div className="flex flex-col w-full gap-4">
                <div className="sm:grid flex flex-col sm:gap-4 gap-2">
                  <FormField
                    errorMessage={nameError || ""}
                    htmlFor="name"
                    id="FName"
                    isInvalid={!!nameError}
                    label="Full Name"
                    placeholder="FirstName LastName"
                    radius="none"
                    type="text"
                    value={name}
                    variant="bordered"
                    onChange={handleNameChange}
                  />
                </div>
                <div className="sm:grid flex flex-col grid-cols-2 sm:gap-4 gap-2">
                  <FormField
                    required
                    errorMessage={emailError || ""}
                    htmlFor="email"
                    id="email"
                    isInvalid={!!emailError}
                    label="Email Address"
                    placeholder="Enter your email address"
                    radius="none"
                    type="email"
                    value={email}
                    variant="bordered"
                    onChange={handleEmailChange}
                  />

                  <div className="flex flex-col gap-2.5 pt-1">
                    <Label>Phone</Label>
                    <PhoneInput
                      forceDialCode
                      className="rounded-none"
                      defaultCountry="nig"
                      hideDropdown={false}
                      inputClassName={cn(
                        "max-h-[46px] border-2 px-2 h-full min-h-[46px] bg-transparent h-[46px] w-full data-[hover=true]:border-idLink data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary"
                      )}
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                    {!!phoneError && (
                      <div className="text-red-500 text-xs">
                        Invalid phone number
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:grid flex flex-col grid-cols-2 sm:gap-4 gap-2">
                  <Select
                    className="rounded-none w-full data-[hover=true]:border-idLink data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary user-select-none"
                    classNames={{
                      label: "text-small",
                    }}
                    label="Gender"
                    labelPlacement="outside"
                    placeholder="Select Gender"
                    radius="none"
                    selectedKeys={gender && [gender]}
                    size="lg"
                    variant="bordered"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <SelectItem key="Male" value="Male">
                      Male
                    </SelectItem>
                    <SelectItem key="Female" value="Female">
                      Female
                    </SelectItem>
                  </Select>

                  <DatePicker
                    label="Date of Birth"
                    variant="bordered"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-small",
                    }}
                    className="rounded-none gap-[10px] w-full data-[hover=true]:border-idLink data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary bg-background user-select-none"
                    size="lg"
                    radius="none"
                    onChange={(e) => {
                      setDOB(e);
                    }}
                    value={DOB}
                  />
                </div>

                <div className="sm:grid flex flex-col grid-cols-2 sm:gap-4 gap-2">
                  <FormField
                    required
                    errorMessage={facultyError || ""}
                    htmlFor="faculty"
                    id="faculty"
                    isInvalid={!!facultyError}
                    label="Faculty"
                    placeholder="Enter your faculty"
                    radius="none"
                    type="faculty"
                    value={faculty}
                    variant="bordered"
                    onChange={handleFacultyChange}
                  />

                  <FormField
                    errorMessage={departmentError || ""}
                    htmlFor="department"
                    id="department"
                    isInvalid={!!departmentError}
                    label="Department"
                    placeholder="Enter your department"
                    radius="none"
                    type="department"
                    value={department}
                    variant="bordered"
                    onChange={handleDepartmentChange}
                  />
                </div>

                <div className="sm:grid flex flex-col grid-cols-2 sm:gap-4 gap-2">
                  <DatePicker
                    label="Session In"
                    variant="bordered"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-small",
                    }}
                    className="rounded-none gap-[10px] w-full data-[hover=true]:border-idLink data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary bg-background user-select-none"
                    size="lg"
                    radius="none"
                    onChange={(e) => {
                      setSessionIn(e);
                    }}
                    value={sessionIn}
                  />
                  <DatePicker
                    label="Session Out"
                    variant="bordered"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-small",
                    }}
                    className="rounded-none gap-[10px] w-full data-[hover=true]:border-idLink data-[has-start-content=true]:ps-3 group-data-[focus=true]:border-primary bg-background user-select-none"
                    size="lg"
                    radius="none"
                    onChange={(e) => {
                      setSessionOut(e);
                    }}
                    value={sessionOut}
                  />
                </div>

                <PasswordField
                  PasswordText={"Password"}
                  errorMessage={passwordError || ""}
                  handlePasswordChange={handlePasswordChange}
                  isInvalid={!!passwordError}
                  passwordError={passwordError}
                  placheolderText={"*******"}
                  radius="none"
                  value={password}
                />
                <PasswordField
                  PasswordText={"Confirm Password"}
                  errorMessage={confirmPasswordError || ""}
                  handlePasswordChange={handleConfirmPasswordChange}
                  isInvalid={!!confirmPasswordError}
                  passwordError={confirmPasswordError}
                  placheolderText={"*******"}
                  radius="none"
                  value={confirmPassword}
                />
              </div>
              <CardFooter className="p-0">
                <SubmitBtn isDisabled={isDisabled} isLoading={isLoading}>
                  Sign Up
                </SubmitBtn>
              </CardFooter>
            </div>
          </form>

          <div className="terms flex w-full justify-center font-poppins p-1 px-2">
            <p className="text-center font-medium text-gray-500 text-medium">
              By signing up you agree to {siteConfig.name}{" "}
              <Link
                className="text-primary hover:bg-transparent font-medium hover:text-primary-800"
                href="/terms"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="text-primary hover:bg-transparent font-medium hover:text-primary-800"
                href="/policy"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Card>
      )}
      {message && (
        <Card>
          <CardBody>
            <p className="text-lg">{message}</p>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default RegisterForm;
