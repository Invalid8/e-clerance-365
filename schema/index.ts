import { z } from "zod";
import { PhoneNumberUtil } from "google-libphonenumber";

import { createSchema } from "@/lib";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export const PhoneSchema = createSchema(
  (value) => isPhoneValid(value),
  "Invalid Phone Number"
);

export const FullNameSchema = createSchema((data) => {
  const names = data.split(" ");

  return names.length === 2 && names.every((name) => name.length > 0);
}, "Please enter your full name");

export const UsernameSchema = createSchema(
  (value) => value.length > 3,
  "Please enter your username"
);

export const ReferalSchema = createSchema(
  (value) => value.length > 1,
  "Please enter a valid referal code"
);

export const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

export const PasswordLengthSchema = createSchema(
  (value) => value.length >= 8,
  "Password must be at least 8 characters long."
);

export const NationalitySchema = createSchema(
  (value) => value.length >= 1,
  "Enter your nationality"
);

export const PasswordAlphanumericSchema = createSchema(
  (value) => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
  "Password must contain at least one letter and one number."
);

export const normSchema = createSchema(
  (value) => value.length > 1,
  "Please enter a valid input"
);
